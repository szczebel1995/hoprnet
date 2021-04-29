import levelup, { LevelUp } from 'levelup'
import leveldown from 'leveldown'
import { existsSync, mkdirSync } from 'fs'
import path from 'path'
import { VERSION } from './constants'
import type { HoprOptions } from '.'
import Debug from 'debug'
import { u8aEquals, Hash, u8aAdd, toU8a, u8aConcat, Address } from '@hoprnet/hopr-utils'
import assert from 'assert'
import HoprCoreEthereum, {
  Ticket,
  Acknowledgement,
  SubmitTicketResponse,
  UnacknowledgedTicket
} from '@hoprnet/hopr-core-ethereum'

const log = Debug(`hopr-core:db`)

const encoder = new TextEncoder()
const TICKET_PREFIX: Uint8Array = encoder.encode('tickets-')
const PACKET_TAG_PREFIX: Uint8Array = encoder.encode('packets-tag-')
const ACKNOWLEDGED_TICKET_COUNTER = encoder.encode('tickets-acknowledgedCounter')
const acknowledgedSubPrefix = encoder.encode('acknowledged-')
const unAcknowledgedSubPrefix = encoder.encode('unacknowledged-')

const KEY_LENGTH = 32
const ACKNOWLEDGED_TICKET_INDEX_LENGTH = 8

function keyAcknowledgedTickets(index: Uint8Array): Uint8Array {
  assert.equal(index.length, ACKNOWLEDGED_TICKET_INDEX_LENGTH)
  return u8aConcat(TICKET_PREFIX, acknowledgedSubPrefix, index)
}

function AcknowledgedTicketsParse(arr: Uint8Array): Uint8Array {
  return arr.slice(TICKET_PREFIX.length + acknowledgedSubPrefix.length, arr.length)
}

export function UnAcknowledgedTickets(hashedKey: Uint8Array): Uint8Array {
  assert.equal(hashedKey.length, KEY_LENGTH)
  return u8aConcat(TICKET_PREFIX, unAcknowledgedSubPrefix, hashedKey)
}

export class CoreDB {
  private db: LevelUp

  constructor(options: HoprOptions, private id: Address) {
    let dbPath: string
    if (options.dbPath) {
      dbPath = options.dbPath
    } else {
      // default
      dbPath = path.join(process.cwd(), 'db', VERSION, 'node')
    }

    dbPath = path.resolve(dbPath)

    log('using db at ', dbPath)
    if (!existsSync(dbPath)) {
      log('db does not exist, creating?:', options.createDbIfNotExist)
      if (options.createDbIfNotExist) {
        mkdirSync(dbPath, { recursive: true })
      } else {
        throw new Error('Database does not exist: ' + dbPath)
      }
    }
    this.db = levelup(leveldown(dbPath))
    log('namespacing db by pubkey: ', id.toHex())
  }

  private keyOf(...segments: Uint8Array[]): Uint8Array {
    return u8aConcat.call(this.id.toHex(), ... segments)
  }

  private async has(key: Uint8Array): Promise<boolean> {
    try {
      await this.db.get(key)
      return true
    } catch (err) {
      if (err.type === 'NotFoundError' || err.notFound === undefined || !err.notFound) {
        return false
      } else {
        throw err
      }
    }
  }

  private async touch(key: Uint8Array): Promise<void> {
    return await this.db.put(Buffer.from(key), Buffer.from(''))
  }

  public getLevelUpTempUntilRefactored(): LevelUp {
    // TODO remove this when we can refactor other code to use methods
    return this.db
  }

  /**
   * Get all unacknowledged tickets
   * @param filter optionally filter by signer
   * @returns an array of all unacknowledged tickets
   */
  public async getUnacknowledgedTickets(filter?: { signer: Uint8Array }): Promise<UnacknowledgedTicket[]> {
    const tickets: UnacknowledgedTicket[] = []

    return new Promise((resolve, reject) => {
      this.db
        .createReadStream({
          gte: Buffer.from(UnAcknowledgedTickets(new Uint8Array(0x00)))
        })
        .on('error', (err: any) => reject(err))
        .on('data', async ({ value }: { value: Buffer }) => {
          if (value.buffer.byteLength !== UnacknowledgedTicket.SIZE()) return

          const unAckTicket = UnacknowledgedTicket.deserialize(value)

          // if signer provided doesn't match our ticket's signer dont add it to the list
          if (filter?.signer && !u8aEquals(unAckTicket.ticket.getSigner().serialize(), filter.signer)) {
            return
          }

          tickets.push(unAckTicket)
        })
        .on('end', () => resolve(tickets))
    })
  }

  /**
   * Delete unacknowledged tickets
   * @param filter optionally filter by signer
   */
  async deleteUnacknowledgedTickets(filter?: { signer: Uint8Array }): Promise<void> {
    const tickets = await this.getUnacknowledgedTickets(filter)

    await this.db.batch(
      await Promise.all(
        tickets.map<any>(async (ticket) => {
          return {
            type: 'del',
            key: Buffer.from(UnAcknowledgedTickets(ticket.ticket.challenge.serialize()))
          }
        })
      )
    )
  }

  /**
   * Get all acknowledged tickets
   * @param filter optionally filter by signer
   * @returns an array of all acknowledged tickets
   */
  async getAcknowledgements(filter?: {
    signer: Uint8Array
  }): Promise<
    {
      ackTicket: Acknowledgement
      index: Uint8Array
    }[]
  > {
    const results: {
      ackTicket: Acknowledgement
      index: Uint8Array
    }[] = []

    return new Promise((resolve, reject) => {
      this.db
        .createReadStream({
          gte: Buffer.from(keyAcknowledgedTickets(new Uint8Array(0x00)))
        })
        .on('error', (err) => reject(err))
        .on('data', async ({ key, value }: { key: Buffer; value: Buffer }) => {
          if (value.buffer.byteLength !== Acknowledgement.SIZE) return

          const index = AcknowledgedTicketsParse(key)
          const ackTicket = Acknowledgement.deserialize(value)

          // if signer provided doesn't match our ticket's signer dont add it to the list
          if (filter?.signer && !u8aEquals((await ackTicket.ticket).getSigner().serialize(), filter.signer)) {
            return
          }

          results.push({
            ackTicket,
            index
          })
        })
        .on('end', () => resolve(results))
    })
  }

  /**
   * Delete acknowledged tickets
   * @param filter optionally filter by signer
   */
  async deleteAcknowledgements(filter?: { signer: Uint8Array }): Promise<void> {
    const acks = await this.getAcknowledgements(filter)
    await this.db.batch(
      await Promise.all(
        acks.map<any>(async (ack) => {
          return {
            type: 'del',
            key: Buffer.from(keyAcknowledgedTickets((await ack.ackTicket.ticket).challenge.serialize()))
          }
        })
      )
    )
  }

  /**
   * Update acknowledged ticket in database
   * @param ackTicket Uint8Array
   * @param index Uint8Array
   */
  async updateAcknowledgement(ackTicket: Acknowledgement, index: Uint8Array): Promise<void> {
    await this.db.put(Buffer.from(keyAcknowledgedTickets(index)), Buffer.from(ackTicket.serialize()))
  }

  /**
   * Delete acknowledged ticket in database
   * @param index Uint8Array
   */
  async deleteAcknowledgement(index: Uint8Array): Promise<void> {
    await this.db.del(Buffer.from(keyAcknowledgedTickets(index)))
  }

  /**
   * Submit acknowledged ticket and update database
   * @param ackTicket Uint8Array
   * @param index Uint8Array
   */
  public async submitAcknowledgedTicket(
    ethereum: HoprCoreEthereum,
    ackTicket: Acknowledgement,
    index: Uint8Array
  ): Promise<SubmitTicketResponse> {
    try {
      const signedTicket = ackTicket.ticket
      const self = ethereum.getPublicKey()
      const counterparty = signedTicket.getSigner()
      const channel = ethereum.getChannel(self, counterparty)

      const result = await channel.submitTicket(ackTicket)
      // TODO look at result.status and actually do something
      await this.deleteAcknowledgement(index)
      return result
    } catch (err) {
      return {
        status: 'ERROR',
        error: err
      }
    }
  }

  /**
   * Get signed tickets, both unacknowledged and acknowledged
   * @param node
   * @param filter optionally filter by signer
   * @returns an array of signed tickets
   */
  async getTickets(filter?: { signer: Uint8Array }): Promise<Ticket[]> {
    return Promise.all([this.getUnacknowledgedTickets(filter), this.getAcknowledgements(filter)]).then(
      async ([unAcks, acks]) => {
        const unAckTickets = await Promise.all(unAcks.map((o) => o.ticket))
        const ackTickets = await Promise.all(acks.map((o) => o.ackTicket.ticket))

        return [...unAckTickets, ...ackTickets]
      }
    )
  }

  /**
   * Get signed tickets, both unacknowledged and acknowledged
   * @param node
   * @param filter optionally filter by signer
   * @returns an array of signed tickets
   */
  async deleteTickets(filter?: { signer: Uint8Array }): Promise<void> {
    await Promise.all([this.deleteUnacknowledgedTickets(filter), this.deleteAcknowledgements(filter)])
  }

  async storeUnacknowledgedTickets(key: Uint8Array, unacknowledged: UnacknowledgedTicket) {
    this.db.put(Buffer.from(UnAcknowledgedTickets(key)), Buffer.from(unacknowledged.serialize()))
  }

  async hasPacket(id: Uint8Array) {
    if (this.has(this.keyOf(PACKET_TAG_PREFIX, id))) {
      await this.touch(this.keyOf(PACKET_TAG_PREFIX, id))
      return true
    }
    throw Error('Key is already present. Cannot accept packet because it might be a duplicate.')
  }

  async getUnacknowledgedTicketsByKey(key: Hash): Promise<UnacknowledgedTicket | undefined> {
    const unAcknowledgedDbKey = UnAcknowledgedTickets(key.serialize())
    try {
      const buff = await this.db.get(Buffer.from(unAcknowledgedDbKey))
      if (buff.length === 0) {
        return undefined
      }
      return UnacknowledgedTicket.deserialize(buff)
    } catch (err) {
      if (err.notFound) {
        return undefined
      }
      throw err
    }
  }

  async deleteTicket(key: Hash) {
    const k = UnAcknowledgedTickets(key.serialize())
    await this.db.del(Buffer.from(k))
  }

  async replaceTicketWithAcknowledgement(key: Hash, acknowledgment: Acknowledgement) {
    const ticketCounter = await this.incrementTicketCounter()
    const unAcknowledgedDbKey = UnAcknowledgedTickets(key.serialize())
    const acknowledgedDbKey = keyAcknowledgedTickets(ticketCounter)
    try {
      await this.db
        .batch()
        .del(Buffer.from(unAcknowledgedDbKey))
        .put(Buffer.from(acknowledgedDbKey), Buffer.from(acknowledgment.serialize()))
        .put(Buffer.from(ACKNOWLEDGED_TICKET_COUNTER), Buffer.from(ticketCounter))
        .write()
    } catch (err) {
      log(`ERROR: Error while writing to database. Error was ${err.message}.`)
    }
  }

  async incrementTicketCounter(): Promise<Uint8Array> {
    let ticketCounter
    try {
      let tmpTicketCounter = await this.db.get(Buffer.from(ACKNOWLEDGED_TICKET_COUNTER))
      ticketCounter = u8aAdd(true, tmpTicketCounter, toU8a(1, ACKNOWLEDGED_TICKET_INDEX_LENGTH))
    } catch (err) {
      // Set ticketCounter to initial value
      ticketCounter = toU8a(0, ACKNOWLEDGED_TICKET_INDEX_LENGTH)
    }
    return ticketCounter
  }

  async storeUnacknowledgedTicket(challenge: Hash) {
    const unAcknowledgedDBKey = UnAcknowledgedTickets(challenge.serialize())
    await this.touch(unAcknowledgedDBKey)
    return unAcknowledgedDBKey
  }

  public close() {
    return this.db.close()
  }
}
