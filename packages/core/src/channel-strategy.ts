import type { ChannelEntry } from '@hoprnet/hopr-core-ethereum'
import {
  AcknowledgedTicket,
  PublicKey,
  MINIMUM_REASONABLE_CHANNEL_STAKE,
  MAX_AUTO_CHANNELS,
  PRICE_PER_PACKET
} from '@hoprnet/hopr-utils'
import BN from 'bn.js'
import { MAX_NEW_CHANNELS_PER_TICK, NETWORK_QUALITY_THRESHOLD, INTERMEDIATE_HOPS, CHECK_TIMEOUT } from './constants'
import { debug } from '@hoprnet/hopr-utils'
import type NetworkPeers from './network/network-peers'
import type HoprCoreEthereum from '@hoprnet/hopr-core-ethereum'
const log = debug('hopr-core:channel-strategy')

export type ChannelsToOpen = [PublicKey, BN]
export type ChannelsToClose = PublicKey

/**
 * Staked nodes will likely want to automate opening and closing of channels. By
 * implementing the following interface, they can decide how to allocate their
 * stake to best attract traffic with a useful channel graph.
 *
 * Implementors should bear in mind:
 * - Churn is expensive
 * - Path finding will prefer high stakes, and high availability of nodes.
 */
export interface ChannelStrategy {
  name: string

  tick(
    balance: BN,
    currentChannels: ChannelEntry[],
    networkPeers: NetworkPeers,
    getRandomChannel: () => Promise<ChannelEntry>
  ): Promise<[ChannelsToOpen[], ChannelsToClose[]]>
  // TBD: Include ChannelsToClose as well.

  onChannelWillClose(channel: ChannelEntry, chain: HoprCoreEthereum): Promise<void> // Before a channel closes
  onWinningTicket(t: AcknowledgedTicket, chain: HoprCoreEthereum): Promise<void>
  shouldCommitToChannel(c: ChannelEntry): Promise<boolean>

  tickInterval: number
}

/*
 * Saves duplication of 'normal' behaviour.
 *
 * At present this does not take gas into consideration.
 */
export abstract class SaneDefaults {
  async onWinningTicket(ackTicket: AcknowledgedTicket, chain: HoprCoreEthereum) {
    const counterparty = ackTicket.signer
    log(`auto redeeming tickets in channel to ${counterparty.toPeerId().toB58String()}`)
    await chain.redeemTicketsInChannelByCounterparty(counterparty)
  }

  async onChannelWillClose(channel: ChannelEntry, chain: HoprCoreEthereum) {
    const counterparty = channel.source
    const selfPubKey = chain.getPublicKey()
    if (!counterparty.eq(selfPubKey)) {
      log(`auto redeeming tickets in channel to ${counterparty.toPeerId().toB58String()}`)
      await chain.redeemTicketsInChannel(channel)
    }
  }

  async shouldCommitToChannel(_c: ChannelEntry): Promise<boolean> {
    log('committing to channel')
    return true
  }

  tickInterval = CHECK_TIMEOUT
}

// Don't auto open any channels
export class PassiveStrategy extends SaneDefaults implements ChannelStrategy {
  name = 'passive'

  async tick(_balance: BN, _c: ChannelEntry[], _p: NetworkPeers): Promise<[ChannelsToOpen[], ChannelsToClose[]]> {
    return [[], []]
  }
}

// Open channel to as many peers as possible
export class PromiscuousStrategy extends SaneDefaults implements ChannelStrategy {
  name = 'promiscuous'

  async tick(
    balance: BN,
    currentChannels: ChannelEntry[],
    peers: NetworkPeers,
    getRandomChannel: () => Promise<ChannelEntry>
  ): Promise<[ChannelsToOpen[], ChannelsToClose[]]> {
    log(
      'currently open',
      currentChannels.map((x) => x.toString())
    )
    let toOpen: ChannelsToOpen[] = []

    let i = 0
    let toClose = currentChannels
      .filter((x: ChannelEntry) => {
        return (
          peers.qualityOf(x.destination.toPeerId()) < 0.1 ||
          // Lets append channels with less balance than a full hop messageto toClose.
          // NB: This is based on channel balance, not expected balance so may not be
          // aggressive enough.
          x.balance.toBN().lte(PRICE_PER_PACKET.muln(INTERMEDIATE_HOPS))
        )
      })
      .map((x) => x.destination)

    // First let's open channels to any interesting peers we have
    peers.all().forEach((peerId) => {
      if (
        balance.gtn(0) &&
        currentChannels.length + toOpen.length < MAX_AUTO_CHANNELS &&
        !toOpen.find((x) => x[0].eq(PublicKey.fromPeerId(peerId))) &&
        !currentChannels.find((x) => x.destination.toPeerId().equals(peerId)) &&
        peers.qualityOf(peerId) > NETWORK_QUALITY_THRESHOLD
      ) {
        toOpen.push([PublicKey.fromPeerId(peerId), MINIMUM_REASONABLE_CHANNEL_STAKE])
        balance.isub(MINIMUM_REASONABLE_CHANNEL_STAKE)
      }
    })

    // Now let's evaluate new channels
    while (
      balance.gtn(0) &&
      i++ < MAX_NEW_CHANNELS_PER_TICK &&
      currentChannels.length + toOpen.length < MAX_AUTO_CHANNELS
    ) {
      let randomChannel = await getRandomChannel()
      if (randomChannel === undefined) {
        log('no channel available')
        break
      }
      log('evaluating', randomChannel.source.toString())
      peers.register(randomChannel.source.toPeerId())
      if (
        !toOpen.find((x) => x[0].eq(randomChannel.source)) &&
        !currentChannels.find((x) => x.destination.eq(randomChannel.source)) &&
        peers.qualityOf(randomChannel.source.toPeerId()) > NETWORK_QUALITY_THRESHOLD
      ) {
        toOpen.push([randomChannel.source, MINIMUM_REASONABLE_CHANNEL_STAKE])
        balance.isub(MINIMUM_REASONABLE_CHANNEL_STAKE)
      }
    }
    log(
      'Promiscuous toOpen: ',
      toOpen.map((p) => p.toString())
    )
    return [toOpen, toClose]
  }
}
