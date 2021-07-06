import type { HoprOptions, ChannelsToOpen, ChannelsToClose } from '@hoprnet/hopr-core'
import Hopr, { SaneDefaults } from '@hoprnet/hopr-core'
import BN from 'bn.js'
import { BigNumber } from 'bignumber.js'
import { PublicKey, HoprDB, ChannelEntry } from '@hoprnet/hopr-utils'
import { createChainWrapper, Indexer, CONFIRMATIONS, INDEXER_BLOCK_RANGE } from '@hoprnet/hopr-core-ethereum'
import type PeerId from 'peer-id'

const CHANNELS_PER_COVER_TRAFFIC_NODE = 5
const CHANNEL_STAKE = new BN('1000')
const MINIMUM_STAKE_BEFORE_CLOSURE = new BN('0')

const options: HoprOptions = {
  //provider: 'wss://still-patient-forest.xdai.quiknode.pro/f0cdbd6455c0b3aea8512fc9e7d161c1c0abf66a/',
  provider: 'https://eth-goerli.gateway.pokt.network/v1/6021a2b6928ff9002e6c7f2f',
  createDbIfNotExist: true,
  password: '',
  forceCreateDB: true,
  announce: false
}

export const addBN = (a: BN, b: BN): BN => a.add(b)
export const sqrtBN = (a: BN): BN => new BN(new BigNumber(a.toString()).squareRoot().toString())
export const findChannelsFrom = (p: PublicKey): ChannelEntry[] =>
  Object.values(STATE.channels).filter((c: ChannelEntry) => c.source.eq(p))
export const totalChannelBalanceFor = (p: PublicKey): BN =>
  findChannelsFrom(p)
    .map((c) => c.balance.toBN())
    .reduce(addBN, new BN('0'))

export const importance = (p: PublicKey): BN =>
  findChannelsFrom(p)
    .map((c: ChannelEntry) =>
      sqrtBN(totalChannelBalanceFor(p).mul(c.balance.toBN()).mul(totalChannelBalanceFor(c.destination)))
    )
    .reduce(addBN, new BN('0'))

export const findChannel = (src: PublicKey, dest: PublicKey): ChannelEntry =>
  Object.values(STATE.channels).find((c: ChannelEntry) => c.source.eq(src) && c.destination.eq(dest))
export const getNode = (b58String: string): PeerData => STATE.nodes[b58String]

export const weightedRandomChoice = (): PublicKey => {
  if (Object.keys(STATE.nodes).length == 0) {
    throw new Error('no nodes to pick from')
  }
  const weights: Record<string, BN> = {}
  let total = new BN('0')
  Object.values(STATE.nodes).forEach((p) => {
    weights[p.pub.toHex()] = importance(p.pub)
    total = total.add(weights[p.pub.toHex()])
  })

  const ind = Math.random()
  let interval = total.muln(ind)
  for (let node of Object.keys(weights)) {
    interval = interval.sub(weights[node])
    if (interval.lte(new BN('0'))) {
      return PublicKey.fromString(node)
    }
  }
  throw new Error('wtf')
}


class CoverTrafficStrategy extends SaneDefaults {
  name = "covertraffic"
  constructor(private update:(State) => void, private selfPub: PublicKey) {
    super()
  }

  async tick(
    _balance: BN,
    _n: ChannelEntry[],
    _currentChannels: ChannelEntry[],
    _peers: any,
    _getRandomChannel: () => Promise<ChannelEntry>
  ): Promise<[ChannelsToOpen[], ChannelsToClose[]]> {

    const toOpen = []
    const toClose = []

    STATE.ctChannels.forEach(dest => {
      const c = findChannel(this.selfPub, dest) 
      if (c.balance.toBN().lte(MINIMUM_STAKE_BEFORE_CLOSURE)){
        toClose.push(dest)
      }
    })

    if (STATE.ctChannels.length < CHANNELS_PER_COVER_TRAFFIC_NODE && Object.keys(STATE.nodes).length > 0) {
      const c = weightedRandomChoice()
      if (!STATE.ctChannels.find((x) => x.eq(c)) && !c.eq(this.selfPub)) {
        STATE.ctChannels.push(c)
        toOpen.push([c, CHANNEL_STAKE])
      }
    }
    this.update(STATE)
    return [toOpen, toClose]
  }
}

type PeerData = {
  id: any //PeerId,
  pub: PublicKey
  multiaddrs: any
}
export type State = {
  nodes: Record<string, PeerData>
  channels: Record<string, ChannelEntry>
  log: string[]
  ctChannels: PublicKey[]
}

const STATE: State = {
  nodes: {},
  channels: {},
  log: [],
  ctChannels: []
}

export async function main(update: (State) => void, peerId: PeerId) {
  const selfPub = PublicKey.fromPeerId(peerId)
  const selfAddr = selfPub.toAddress()

  const onChannelUpdate = (newChannel) => {
    STATE.channels[newChannel.getId().toHex()] = newChannel
    update(STATE)
  }

  const peerUpdate = (peer) => {
    STATE.nodes[peer.id.toB58String()] = {
      id: peer.id,
      multiaddrs: peer.multiaddrs,
      pub: PublicKey.fromPeerId(peer.id)
    }
    update(STATE)
  }

  const db = new HoprDB(
    PublicKey.fromPrivKey(peerId.privKey.marshal()).toAddress(),
    options.createDbIfNotExist,
    'cover-traffic',
    options.dbPath,
    options.forceCreateDB
  )

  const chain = await createChainWrapper(options.provider, peerId.privKey.marshal())
  await chain.waitUntilReady()
  const indexer = new Indexer(chain.getGenesisBlock(), db, chain, CONFIRMATIONS, INDEXER_BLOCK_RANGE)
  indexer.on('channel-update', onChannelUpdate)
  indexer.on('peer', peerUpdate)
  STATE.log.push('indexing...')
  update(STATE)
  await indexer.start()
  STATE.log.push('done')
  update(STATE)
  STATE.log.push('creating a node...')
  update(STATE)
  const node = new Hopr(peerId, options)
  STATE.log.push('waiting for node to be funded ...')
  update(STATE)
  await node.waitForFunds()
  STATE.log.push('starting node ...')
  update(STATE)
  await node.start()
  STATE.log.push('node is running')
  const channels = await node.getChannelsFrom(selfAddr)
  channels.forEach((c) => STATE.ctChannels.push(c.destination))
  update(STATE)
  node.setChannelStrategy(new CoverTrafficStrategy(update, selfPub))
}
