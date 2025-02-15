import type { HoprConnectOptions, Stream, StreamType } from '../types'
import handshake from 'it-handshake'
import type { Handshake } from 'it-handshake'
import type PeerId from 'peer-id'

import { green, yellow } from 'chalk'
import { pubKeyToPeerId } from '@hoprnet/hopr-utils'

import { RelayState } from './state'
import type { Relay } from '.'

import debug from 'debug'
import { DELIVERY_PROTOCOL } from '../constants'

export enum RelayHandshakeMessage {
  OK,
  FAIL,
  FAIL_COULD_NOT_REACH_COUNTERPARTY,
  FAIL_COULD_NOT_IDENTIFY_PEER,
  FAIL_INVALID_PUBLIC_KEY,
  FAIL_LOOPBACKS_ARE_NOT_ALLOWED,
  FAIL_RELAY_FULL
}

function handshakeMessageToString(handshakeMessage: RelayHandshakeMessage): string {
  switch (handshakeMessage) {
    case RelayHandshakeMessage.OK:
      return 'OK'
    case RelayHandshakeMessage.FAIL_COULD_NOT_REACH_COUNTERPARTY:
      return 'FAIL_COULD_NOT_REACH_COUNTERPARTY'
    case RelayHandshakeMessage.FAIL_COULD_NOT_IDENTIFY_PEER:
      return 'FAIL_COULD_NOT_IDENTIFY_PEER'
    case RelayHandshakeMessage.FAIL_INVALID_PUBLIC_KEY:
      return 'FAIL_INVALID_PUBLIC_KEY'
    case RelayHandshakeMessage.FAIL_LOOPBACKS_ARE_NOT_ALLOWED:
      return 'FAIL_LOOPBACKS_ARE_NOT_ALLOWED'
    case RelayHandshakeMessage.FAIL_RELAY_FULL:
      return 'FAIL_RELAY_FULL'
    default:
      throw Error(`Invalid state. Got ${handshakeMessage}`)
  }
}

const DEBUG_PREFIX = 'hopr-connect:relay:handshake'

const log = debug(DEBUG_PREFIX)
const error = debug(DEBUG_PREFIX.concat(':error'))
const verbose = debug(DEBUG_PREFIX.concat(':verbose'))

type Response =
  | {
      success: false
      code: 'FAIL'
    }
  | {
      success: true
      stream: Stream
    }

type HandleResponse =
  | {
      success: false
      code: 'FAIL'
    }
  | {
      success: true
      stream: Stream
      counterparty: PeerId
    }

/**
 * Encapsulates the relay handshake procedure
 */
class RelayHandshake {
  private shaker: Handshake<StreamType>

  constructor(stream: Stream, private options: HoprConnectOptions = {}) {
    this.shaker = handshake(stream)
  }

  /**
   * Immediately rejects the relay handshake with the given reason
   * @param reason one of RelayHandshakeMessage to send before termination
   * @returns
   */
  async reject(reason: RelayHandshakeMessage) {
    this.shaker.write(Uint8Array.of(reason))
    this.shaker.rest()
    return {
      success: false,
      code: 'FAIL'
    }
  }

  /**
   * Tries to establish a relayed connection to the given destination
   * @param relay relay to use
   * @param destination destination to connect to trough relay
   * @returns a relayed connection to `destination`
   */
  async initiate(relay: PeerId, destination: PeerId): Promise<Response> {
    this.shaker.write(destination.pubKey.marshal())

    let chunk: StreamType | undefined
    try {
      chunk = await this.shaker.read()
    } catch (err: any) {
      error(`Error while reading answer from ${green(relay.toB58String())}.`, err.message)
    }

    if (chunk == null || chunk.length == 0) {
      verbose(`Received empty message. Discarding`)
      this.shaker.rest()
      return {
        success: false,
        code: 'FAIL'
      }
    }

    const answer = chunk.slice(0, 1)[0]

    this.shaker.rest()

    // Anything can happen
    switch (answer as RelayHandshakeMessage) {
      case RelayHandshakeMessage.OK:
        log(
          `Successfully established outbound relayed connection with ${green(
            destination.toB58String()
          )} over relay ${green(relay.toB58String())}`
        )
        return {
          success: true,
          stream: this.shaker.stream
        }
      default:
        error(
          `Could not establish relayed connection to ${green(destination.toB58String())} over relay ${green(
            relay.toB58String()
          )}. Answer was: <${yellow(handshakeMessageToString(answer))}>`
        )

        return {
          success: false,
          code: 'FAIL'
        }
    }
  }

  /**
   * Negotiates between initiator and destination whether they can establish
   * a relayed connection.
   * @param source peerId of the initiator
   * @param getStreamToCounterparty used to connect to counterparty
   * @param exists to check if relay state exists
   * @param isActive to check if existing relay state can be used
   * @param updateExisting to update existing connection with new stream if not active
   * @param createNew to establish a whole-new instance
   */
  async negotiate(
    source: PeerId,
    getStreamToCounterparty: InstanceType<typeof Relay>['dialNodeDirectly'],
    state: Pick<RelayState, 'exists' | 'isActive' | 'updateExisting' | 'createNew'>,
    __relayFreeTimeout?: number
  ): Promise<void> {
    log(`handling relay request`)

    let chunk: StreamType | undefined

    try {
      chunk = await this.shaker.read()
    } catch (err) {
      error(err)
    }

    if (chunk == null || chunk.length == 0) {
      this.shaker.write(Uint8Array.of(RelayHandshakeMessage.FAIL_INVALID_PUBLIC_KEY))
      this.shaker.rest()
      error(`Received empty message from peer ${yellow(source)}. Ending stream because unable to identify counterparty`)
      return
    }

    let destination: PeerId | undefined

    try {
      destination = pubKeyToPeerId(chunk.slice())
    } catch (err) {
      error(err)
    }

    if (destination == null) {
      error(`Cannot decode public key of destination.`)
      this.shaker.write(Uint8Array.of(RelayHandshakeMessage.FAIL_INVALID_PUBLIC_KEY))
      this.shaker.rest()
      return
    }

    log(`counterparty identified as ${destination.toB58String()}`)

    if (source.equals(destination)) {
      error(`Peer ${source.toB58String()} is trying to loopback to itself. Dropping connection.`)
      this.shaker.write(Uint8Array.of(RelayHandshakeMessage.FAIL_LOOPBACKS_ARE_NOT_ALLOWED))
      this.shaker.rest()
      return
    }

    const relayedConnectionExists = state.exists(source, destination)

    if (relayedConnectionExists) {
      // Relay could exist but connection is dead
      const connectionIsActive = await state.isActive(source, destination)

      if (connectionIsActive) {
        this.shaker.write(Uint8Array.of(RelayHandshakeMessage.OK))
        this.shaker.rest()

        state.updateExisting(source, destination, this.shaker.stream)

        return
      }
    }

    let toDestination: Stream | undefined
    try {
      toDestination = await getStreamToCounterparty(destination, DELIVERY_PROTOCOL(this.options.environment))
    } catch (err) {
      error(err)
    }

    // Anything can happen while attempting to connect
    if (toDestination == null) {
      error(`Cannot establish a relayed connection from ${source.toB58String()} to ${destination.toB58String()}`)
      this.shaker.write(Uint8Array.of(RelayHandshakeMessage.FAIL_COULD_NOT_REACH_COUNTERPARTY))
      this.shaker.rest()
      return
    }

    const destinationShaker = handshake(toDestination)

    destinationShaker.write(source.pubKey.marshal())

    let destinationChunk: StreamType | undefined

    try {
      destinationChunk = await destinationShaker.read()
    } catch (err) {
      error(err)
    }

    if (destinationChunk == null || destinationChunk.length == 0) {
      this.shaker.write(Uint8Array.of(RelayHandshakeMessage.FAIL_COULD_NOT_REACH_COUNTERPARTY))
      this.shaker.rest()

      destinationShaker.rest()
      return
    }

    const destinationAnswer = destinationChunk.slice(0, 1)[0]

    switch (destinationAnswer as RelayHandshakeMessage) {
      case RelayHandshakeMessage.OK:
        this.shaker.write(Uint8Array.of(RelayHandshakeMessage.OK))
        this.shaker.rest()
        destinationShaker.rest()

        try {
          await state.createNew(
            source,
            destination,
            this.shaker.stream,
            destinationShaker.stream,
            this.options.relayFreeTimeout
          )
        } catch (err) {
          error(
            `Cannot established relayed connection between ${destination.toB58String()} and ${source.toB58String()}`,
            err
          )
          // @TODO find a way how to forward the error to source and destination
          return
        }
        break
      default:
        this.shaker.write(Uint8Array.of(RelayHandshakeMessage.FAIL_COULD_NOT_REACH_COUNTERPARTY))
        this.shaker.rest()

        destinationShaker.rest()
        return
    }
  }

  /**
   * Handles an incoming request from a relay
   * @param source peerId of the relay
   * @returns a duplex stream with the initiator
   */
  async handle(source: PeerId): Promise<HandleResponse> {
    let chunk: StreamType | undefined
    try {
      chunk = await this.shaker.read()
    } catch (err) {
      error(err)
    }

    // Anything can happen
    if (chunk == null || chunk.length == 0) {
      error(`Received empty message. Ignoring request`)
      this.shaker.write(Uint8Array.of(RelayHandshakeMessage.FAIL))
      this.shaker.rest()

      return {
        success: false,
        code: 'FAIL'
      }
    }

    let initiator: PeerId | undefined

    try {
      initiator = pubKeyToPeerId(chunk.slice())
    } catch (err: any) {
      error(`Could not decode sender peerId.`, err.message)
    }

    if (initiator == null) {
      this.shaker.write(Uint8Array.of(RelayHandshakeMessage.FAIL))
      this.shaker.rest()

      return {
        success: false,
        code: 'FAIL'
      }
    }

    log(
      `Successfully established inbound relayed connection from initiator ${green(
        initiator.toB58String()
      )} over relay ${green(source.toB58String())}.`
    )

    this.shaker.write(Uint8Array.of(RelayHandshakeMessage.OK))
    this.shaker.rest()

    return {
      success: true,
      stream: this.shaker.stream,
      counterparty: initiator
    }
  }
}

export { RelayHandshake }
