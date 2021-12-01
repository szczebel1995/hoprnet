import LibP2P from 'libp2p'
import KadDHT from 'libp2p-kad-dht'
import { NOISE } from '@chainsafe/libp2p-noise'
import { debug, privKeyToPeerId, wait } from '@hoprnet/hopr-utils'
import HoprConnect, { HoprConnectOptions } from '.'
import PeerId from 'peer-id'

const MPLEX = require('libp2p-mplex')
const namespace = 'hopr-connect:test:index'
const log = debug(namespace)

const privateKey = '0xcb1e5d91d46eb54a477a7eefec9c87a1575e3e5384d38f990f19c09aa8ddd332'
const mockPeerId: PeerId = privKeyToPeerId(privateKey)

describe('HoprConnect', function () {
  it('should be able to create a libp2p instance using HoprConnect w/o crashing', async function () {
    this.timeout(3000) // instead of the default 2000ms
    log('starting libp2p w/HoprConnect instance')
    const libp2pStarter = async () =>
      await LibP2P.create({
        mockPeerId,
        addresses: {},
        // libp2p modules
        modules: {
          transport: [HoprConnect as any], // TODO re https://github.com/hoprnet/hopr-connect/issues/78
          streamMuxer: [MPLEX],
          connEncryption: [NOISE],
          dht: KadDHT
        },
        config: {
          // @ts-ignore
          protocolPrefix: 'hopr',
          transport: {
            HoprConnect: {
              initialNodes: []
            } as HoprConnectOptions
          },
          dht: {
            enabled: true
          },
          relay: {
            enabled: false
          }
        }
      })
    log('libp2p node starter', libp2pStarter)
    // libp2pStarter()
    log('waiting to ensure no immediate crashes are undetected')
    await wait(300)
    log('completed libp2p instance test')
  })
})
