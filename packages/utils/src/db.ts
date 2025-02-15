import type { LevelUp } from 'levelup'
import levelup from 'levelup'
import leveldown from 'leveldown'
import MemDown from 'memdown'
import { existsSync, mkdirSync, rmSync } from 'fs'
import path from 'path'
import { debug } from './process'
import { Hash, u8aConcat, Address, Intermediate, Ticket, generateChannelId } from '.'
import {
  AcknowledgedTicket,
  UnacknowledgedTicket,
  AccountEntry,
  ChannelEntry,
  Snapshot,
  PublicKey,
  Balance,
  HalfKeyChallenge,
  EthereumChallenge,
  UINT256
} from './types'
import BN from 'bn.js'
import { u8aEquals, u8aToNumber } from './u8a'

const log = debug(`hopr-core:db`)
const encoder = new TextEncoder()
const decoder = new TextDecoder()

const TICKET_PREFIX = encoder.encode('tickets-')
const SEPARATOR = encoder.encode(':')
const PENDING_ACKNOWLEDGEMENTS_PREFIX = u8aConcat(TICKET_PREFIX, encoder.encode('pending-acknowledgement-'))
const ACKNOWLEDGED_TICKETS_PREFIX = u8aConcat(TICKET_PREFIX, encoder.encode('acknowledged-'))
export const pendingAcknowledgement = (halfKey: HalfKeyChallenge) => {
  return u8aConcat(PENDING_ACKNOWLEDGEMENTS_PREFIX, halfKey.serialize())
}
const acknowledgedTicketKey = (challenge: EthereumChallenge, channelEpoch: UINT256) => {
  return u8aConcat(ACKNOWLEDGED_TICKETS_PREFIX, channelEpoch.serialize(), SEPARATOR, challenge.serialize())
}
const PACKET_TAG_PREFIX: Uint8Array = encoder.encode('packets-tag-')
const LATEST_BLOCK_NUMBER_KEY = encoder.encode('latestBlockNumber')
const LATEST_CONFIRMED_SNAPSHOT_KEY = encoder.encode('latestConfirmedSnapshot')
const ACCOUNT_PREFIX = encoder.encode('account-')
const CHANNEL_PREFIX = encoder.encode('channel-')
const createChannelKey = (channelId: Hash): Uint8Array => u8aConcat(CHANNEL_PREFIX, encoder.encode(channelId.toHex()))
const createAccountKey = (address: Address): Uint8Array => u8aConcat(ACCOUNT_PREFIX, encoder.encode(address.toHex()))
const COMMITMENT_PREFIX = encoder.encode('commitment:')
const TICKET_INDEX_PREFIX = encoder.encode('ticketIndex:')
const CURRENT = encoder.encode('current')
const REDEEMED_TICKETS_COUNT = encoder.encode('statistics:redeemed:count')
const REDEEMED_TICKETS_VALUE = encoder.encode('statistics:redeemed:value')
const LOSING_TICKET_COUNT = encoder.encode('statistics:losing:count')
const PENDING_TICKETS_VALUE = (address: Address) =>
  u8aConcat(encoder.encode('statistics:pending:value:'), encoder.encode(address.toHex()))
const NEGLECTED_TICKET_COUNT = encoder.encode('statistics:neglected:count')
const REJECTED_TICKETS_COUNT = encoder.encode('statistics:rejected:count')
const REJECTED_TICKETS_VALUE = encoder.encode('statistics:rejected:value')
const ENVIRONMENT_KEY = encoder.encode('environment_id')
const HOPR_BALANCE_KEY = encoder.encode('hopr-balance')

enum PendingAcknowledgementPrefix {
  Relayer = 0,
  MessageSender = 1
}

export type WaitingAsSender = {
  isMessageSender: true
}

export type WaitingAsRelayer = {
  isMessageSender: false
  ticket: UnacknowledgedTicket
}

export type PendingAckowledgement = WaitingAsSender | WaitingAsRelayer

export class HoprDB {
  private db: LevelUp

  constructor(private id: PublicKey) {}

  async init(initialize: boolean, version: string, dbPath: string, forceCreate?: boolean, environmentId?: string) {
    if (!dbPath) {
      if (!environmentId) {
        throw new Error(`must provide environmentId if no dbPath is given`)
      }
      dbPath = path.join(process.cwd(), 'db', environmentId, version)
    }

    dbPath = path.resolve(dbPath)

    let setEnvironment = false

    log('using db at ', dbPath)
    if (forceCreate) {
      log('force create - wipe old database and create a new')
      rmSync(dbPath, { recursive: true, force: true })
      mkdirSync(dbPath, { recursive: true })
      setEnvironment = true
    }
    if (!existsSync(dbPath)) {
      log('db does not exist, creating?:', initialize)
      if (initialize) {
        mkdirSync(dbPath, { recursive: true })
        setEnvironment = true
      } else {
        throw new Error('Database does not exist: ' + dbPath)
      }
    }
    this.db = levelup(leveldown(dbPath))

    // Fully initialize database
    await this.db.open()

    log('namespacing db by pubkey: ', this.id.toAddress().toHex())
    if (setEnvironment) {
      if (!environmentId) {
        throw new Error(`must provide environment id when creating db`)
      }
      log(`setting environment id ${environmentId} to db`)
      await this.setEnvironmentId(environmentId)
    } else {
      const hasEnvironmentKey = await this.verifyEnvironmentId(environmentId)

      if (!hasEnvironmentKey) {
        const storedId = await this.getEnvironmentId()

        throw new Error(`invalid db environment id: ${storedId} (expected: ${environmentId})`)
      }
    }
  }

  private keyOf(...segments: Uint8Array[]): Uint8Array {
    return u8aConcat(encoder.encode(this.id.toHex()), ...segments)
  }

  private async has(key: Uint8Array): Promise<boolean> {
    try {
      await this.db.get(Buffer.from(this.keyOf(key)))

      return true
    } catch (err) {
      if (err.type === 'NotFoundError' || err.notFound) {
        return false
      } else {
        throw err
      }
    }
  }

  private async put(key: Uint8Array, value: Uint8Array): Promise<void> {
    await this.db.put(Buffer.from(this.keyOf(key)), Buffer.from(value))
  }

  private async touch(key: Uint8Array): Promise<void> {
    return await this.put(key, new Uint8Array())
  }

  private async get(key: Uint8Array): Promise<Uint8Array> {
    return Uint8Array.from(await this.db.get(Buffer.from(this.keyOf(key))))
  }

  private async maybeGet(key: Uint8Array): Promise<Uint8Array | undefined> {
    try {
      return await this.get(key)
    } catch (err) {
      if (err.type === 'NotFoundError' || err.notFound) {
        return undefined
      }
      throw err
    }
  }

  private async getCoerced<T>(key: Uint8Array, coerce: (u: Uint8Array) => T) {
    let u8a = await this.get(key)
    return coerce(u8a)
  }

  private async getCoercedOrDefault<T>(key: Uint8Array, coerce: (u: Uint8Array) => T, defaultVal: T) {
    let u8a = await this.maybeGet(key)
    if (u8a === undefined) {
      return defaultVal
    }
    return coerce(u8a)
  }

  private async getAll<T>(
    prefix: Uint8Array,
    deserialize: (u: Uint8Array) => T,
    filter?: (o: T) => boolean,
    sorter?: (e1: T, e2: T) => number
  ): Promise<T[]> {
    const res: T[] = []
    const prefixKeyed = this.keyOf(prefix)
    return new Promise<T[]>((resolve, reject) => {
      this.db
        .createReadStream()
        .on('error', reject)
        .on('data', async ({ key, value }: { key: Buffer; value: Buffer }) => {
          if (!u8aEquals(key.subarray(0, prefixKeyed.length), prefixKeyed)) {
            return
          }
          const obj = deserialize(Uint8Array.from(value))
          // filter if a filter function was given
          if (filter) {
            if (filter(obj)) {
              res.push(obj)
            }
          } else {
            res.push(obj)
          }
        })
        .on('end', () => {
          // sort if a sorter function was given
          if (sorter) {
            res.sort(sorter)
          }
          resolve(res)
        })
    })
  }

  private async del(key: Uint8Array): Promise<void> {
    await this.db.del(Buffer.from(this.keyOf(key)))
  }

  private async increment(key: Uint8Array): Promise<number> {
    let val = await this.getCoercedOrDefault<number>(key, u8aToNumber, 0)
    await this.put(key, Uint8Array.of(val + 1))
    return val + 1
  }

  private async addBalance(key: Uint8Array, amount: Balance): Promise<void> {
    let val = await this.getCoercedOrDefault<Balance>(key, Balance.deserialize, Balance.ZERO())
    await this.put(key, val.add(amount).serialize())
  }

  private async subBalance(key: Uint8Array, amount: Balance): Promise<void> {
    let val = await this.getCoercedOrDefault<Balance>(key, Balance.deserialize, Balance.ZERO())
    await this.put(key, new Balance(val.toBN().sub(amount.toBN())).serialize())
  }

  private serializePendingAcknowledgement(isMessageSender: boolean, unackTicket?: UnacknowledgedTicket) {
    if (isMessageSender) {
      return Uint8Array.from([PendingAcknowledgementPrefix.MessageSender])
    } else {
      return Uint8Array.from([PendingAcknowledgementPrefix.Relayer, ...unackTicket.serialize()])
    }
  }

  private deserializePendingAcknowledgement(data: Uint8Array): PendingAckowledgement {
    switch (data[0] as PendingAcknowledgementPrefix) {
      case PendingAcknowledgementPrefix.MessageSender:
        return {
          isMessageSender: true
        }
      case PendingAcknowledgementPrefix.Relayer:
        return {
          isMessageSender: false,
          ticket: UnacknowledgedTicket.deserialize(data.slice(1))
        }
    }
  }

  /**
   * Get unacknowledged tickets.
   * @param filter optionally filter by signer
   * @returns an array of all unacknowledged tickets
   */
  public async getUnacknowledgedTickets(filter?: { signer: PublicKey }): Promise<UnacknowledgedTicket[]> {
    const filterFunc = (pending: PendingAckowledgement): boolean => {
      if (pending.isMessageSender == true) {
        return false
      }

      // if signer provided doesn't match our ticket's signer dont add it to the list
      if (filter?.signer && pending.ticket.signer.eq(filter.signer)) {
        return false
      }
      return true
    }

    return (
      await this.getAll<WaitingAsRelayer>(
        PENDING_ACKNOWLEDGEMENTS_PREFIX,
        this.deserializePendingAcknowledgement as any,
        filterFunc
      )
    ).map((pending: WaitingAsRelayer) => pending.ticket)
  }

  public async getPendingAcknowledgement(halfKeyChallenge: HalfKeyChallenge): Promise<PendingAckowledgement> {
    const data = await this.get(pendingAcknowledgement(halfKeyChallenge))

    return this.deserializePendingAcknowledgement(data)
  }

  public async storePendingAcknowledgement(halfKeyChallenge: HalfKeyChallenge, isMessageSender: true): Promise<void>
  public async storePendingAcknowledgement(
    halfKeyChallenge: HalfKeyChallenge,
    isMessageSender: false,
    unackTicket: UnacknowledgedTicket
  ): Promise<void>

  public async storePendingAcknowledgement(
    halfKeyChallenge: HalfKeyChallenge,
    isMessageSender: boolean,
    unackTicket?: UnacknowledgedTicket
  ): Promise<void> {
    await this.put(
      pendingAcknowledgement(halfKeyChallenge),
      this.serializePendingAcknowledgement(isMessageSender, unackTicket)
    )
  }

  /**
   * Get acknowledged tickets sorted by ticket index in ascending order.
   * @param filter optionally filter by signer
   * @returns an array of all acknowledged tickets
   */
  public async getAcknowledgedTickets(filter?: {
    signer?: PublicKey
    channel?: ChannelEntry
  }): Promise<AcknowledgedTicket[]> {
    const filterFunc = (a: AcknowledgedTicket): boolean => {
      // if signer provided doesn't match our ticket's signer dont add it to the list
      if (filter?.signer && !a.signer.eq(filter.signer)) {
        return false
      }

      if (
        filter?.channel &&
        (!a.signer.eq(filter.channel.source) ||
          !filter.channel.destination.eq(this.id) ||
          !a.ticket.channelEpoch.eq(filter.channel.channelEpoch))
      ) {
        return false
      }

      return true
    }
    // sort in ascending order by ticket index: 1,2,3,4,...
    const sortFunc = (t1: AcknowledgedTicket, t2: AcknowledgedTicket): number => t1.ticket.index.cmp(t2.ticket.index)

    return this.getAll<AcknowledgedTicket>(
      ACKNOWLEDGED_TICKETS_PREFIX,
      AcknowledgedTicket.deserialize,
      filterFunc,
      sortFunc
    )
  }

  public async deleteAcknowledgedTicketsFromChannel(channel: ChannelEntry): Promise<void> {
    const tickets = await this.getAcknowledgedTickets({ signer: channel.source })
    Promise.all(tickets.map((ticket) => this.delAcknowledgedTicket(ticket)))
    await this.increment(NEGLECTED_TICKET_COUNT)
  }

  /**
   * Delete acknowledged ticket in database
   * @param index Uint8Array
   */
  public async delAcknowledgedTicket(ack: AcknowledgedTicket): Promise<void> {
    await this.del(acknowledgedTicketKey(ack.ticket.challenge, ack.ticket.channelEpoch))
  }

  public async replaceUnAckWithAck(halfKeyChallenge: HalfKeyChallenge, ackTicket: AcknowledgedTicket): Promise<void> {
    const unAcknowledgedDbKey = pendingAcknowledgement(halfKeyChallenge)
    const acknowledgedDbKey = acknowledgedTicketKey(ackTicket.ticket.challenge, ackTicket.ticket.channelEpoch)

    await this.db
      .batch()
      .del(Buffer.from(this.keyOf(unAcknowledgedDbKey)))
      .put(Buffer.from(this.keyOf(acknowledgedDbKey)), Buffer.from(ackTicket.serialize()))
      .write()
  }

  /**
   * Get tickets, both unacknowledged and acknowledged
   * @param node
   * @param filter optionally filter by signer
   * @returns an array of signed tickets
   */
  public async getTickets(filter?: { signer: PublicKey }): Promise<Ticket[]> {
    return Promise.all([this.getUnacknowledgedTickets(filter), this.getAcknowledgedTickets(filter)]).then(
      async ([unAcks, acks]) => {
        const unAckTickets = await Promise.all(unAcks.map((o) => o.ticket))
        const ackTickets = await Promise.all(acks.map((o) => o.ticket))
        return [...unAckTickets, ...ackTickets]
      }
    )
  }

  /**
   * Checks whether the given packet tag is present in the database.
   * If not, sets the packet tag and return false, otherwise return
   * true.
   * @param packetTag packet tag to check for
   * @returns a Promise that resolves to true if packet tag is present in db
   */
  async checkAndSetPacketTag(packetTag: Uint8Array) {
    let present = await this.has(this.keyOf(PACKET_TAG_PREFIX, packetTag))

    if (!present) {
      await this.touch(this.keyOf(PACKET_TAG_PREFIX, packetTag))
    }

    return present
  }

  public close() {
    log('Closing database')
    return this.db.close()
  }

  async storeHashIntermediaries(channelId: Hash, intermediates: Intermediate[]): Promise<void> {
    let dbBatch = this.db.batch()
    const keyFor = (iteration: number) =>
      this.keyOf(u8aConcat(COMMITMENT_PREFIX, channelId.serialize(), Uint8Array.of(iteration)))
    for (const intermediate of intermediates) {
      dbBatch = dbBatch.put(Buffer.from(keyFor(intermediate.iteration)), Buffer.from(intermediate.preImage))
    }
    await dbBatch.write()
  }

  async getCommitment(channelId: Hash, iteration: number) {
    return await this.maybeGet(u8aConcat(COMMITMENT_PREFIX, channelId.serialize(), Uint8Array.of(iteration)))
  }

  async getCurrentCommitment(channelId: Hash): Promise<Hash> {
    return new Hash(await this.get(Uint8Array.from([...COMMITMENT_PREFIX, ...CURRENT, ...channelId.serialize()])))
  }

  setCurrentCommitment(channelId: Hash, commitment: Hash): Promise<void> {
    return this.put(
      Uint8Array.from([...COMMITMENT_PREFIX, ...CURRENT, ...channelId.serialize()]),
      commitment.serialize()
    )
  }

  async getCurrentTicketIndex(channelId: Hash): Promise<UINT256 | undefined> {
    return await this.getCoercedOrDefault(
      Uint8Array.from([...TICKET_INDEX_PREFIX, ...CURRENT, ...channelId.serialize()]),
      UINT256.deserialize,
      undefined
    )
  }

  setCurrentTicketIndex(channelId: Hash, ticketIndex: UINT256): Promise<void> {
    return this.put(
      Uint8Array.from([...TICKET_INDEX_PREFIX, ...CURRENT, ...channelId.serialize()]),
      ticketIndex.serialize()
    )
  }

  async getLatestBlockNumber(): Promise<number> {
    if (!(await this.has(LATEST_BLOCK_NUMBER_KEY))) return 0
    return new BN(await this.get(LATEST_BLOCK_NUMBER_KEY)).toNumber()
  }

  async updateLatestBlockNumber(blockNumber: BN): Promise<void> {
    await this.put(LATEST_BLOCK_NUMBER_KEY, blockNumber.toBuffer())
  }

  async getLatestConfirmedSnapshotOrUndefined(): Promise<Snapshot | undefined> {
    return await this.getCoercedOrDefault(LATEST_CONFIRMED_SNAPSHOT_KEY, Snapshot.deserialize, undefined)
  }

  async updateLatestConfirmedSnapshot(snapshot: Snapshot): Promise<void> {
    await this.put(LATEST_CONFIRMED_SNAPSHOT_KEY, snapshot.serialize())
  }

  async getChannel(channelId: Hash): Promise<ChannelEntry> {
    return await this.getCoerced(createChannelKey(channelId), ChannelEntry.deserialize)
  }

  async getChannels(filter?: (channel: ChannelEntry) => boolean): Promise<ChannelEntry[]> {
    return this.getAll<ChannelEntry>(CHANNEL_PREFIX, ChannelEntry.deserialize, filter)
  }

  async updateChannel(channelId: Hash, channel: ChannelEntry): Promise<void> {
    await this.put(createChannelKey(channelId), channel.serialize())
  }

  async getAccount(address: Address): Promise<AccountEntry | undefined> {
    const data = await this.maybeGet(createAccountKey(address))
    return data ? AccountEntry.deserialize(data) : undefined
  }

  async updateAccount(account: AccountEntry): Promise<void> {
    await this.put(createAccountKey(account.address), account.serialize())
  }

  async getAccounts(filter?: (account: AccountEntry) => boolean) {
    return this.getAll<AccountEntry>(ACCOUNT_PREFIX, AccountEntry.deserialize, filter)
  }

  public async getRedeemedTicketsValue(): Promise<Balance> {
    return await this.getCoercedOrDefault(REDEEMED_TICKETS_VALUE, Balance.deserialize, Balance.ZERO())
  }
  public async getRedeemedTicketsCount(): Promise<number> {
    return this.getCoercedOrDefault(REDEEMED_TICKETS_COUNT, u8aToNumber, 0)
  }

  public async getNeglectedTicketsCount(): Promise<number> {
    return this.getCoercedOrDefault(NEGLECTED_TICKET_COUNT, u8aToNumber, 0)
  }

  public async getPendingTicketCount(): Promise<number> {
    return (await this.getUnacknowledgedTickets()).length
  }

  public async getPendingBalanceTo(counterparty: Address): Promise<Balance> {
    return await this.getCoercedOrDefault(PENDING_TICKETS_VALUE(counterparty), Balance.deserialize, Balance.ZERO())
  }

  public async getLosingTicketCount(): Promise<number> {
    return this.getCoercedOrDefault(LOSING_TICKET_COUNT, u8aToNumber, 0)
  }

  public async markPending(ticket: Ticket) {
    await this.addBalance(PENDING_TICKETS_VALUE(ticket.counterparty), ticket.amount)
  }

  public async resolvePending(ticket: Partial<Ticket>) {
    await this.subBalance(PENDING_TICKETS_VALUE(ticket.counterparty), ticket.amount)
  }

  public async markRedeemeed(a: AcknowledgedTicket): Promise<void> {
    await this.increment(REDEEMED_TICKETS_COUNT)
    await this.delAcknowledgedTicket(a)
    await this.addBalance(REDEEMED_TICKETS_VALUE, a.ticket.amount)
    await this.subBalance(PENDING_TICKETS_VALUE(a.ticket.counterparty), a.ticket.amount)
  }

  public async markLosing(t: UnacknowledgedTicket): Promise<void> {
    await this.increment(LOSING_TICKET_COUNT)
    await this.del(pendingAcknowledgement(t.getChallenge()))
    await this.subBalance(PENDING_TICKETS_VALUE(t.ticket.counterparty), t.ticket.amount)
  }

  public async getRejectedTicketsValue(): Promise<Balance> {
    return await this.getCoercedOrDefault(REJECTED_TICKETS_VALUE, Balance.deserialize, Balance.ZERO())
  }
  public async getRejectedTicketsCount(): Promise<number> {
    return this.getCoercedOrDefault(REJECTED_TICKETS_COUNT, u8aToNumber, 0)
  }
  public async markRejected(t: Ticket): Promise<void> {
    await this.increment(REJECTED_TICKETS_COUNT)
    await this.addBalance(REJECTED_TICKETS_VALUE, t.amount)
  }

  static createMock(id?: PublicKey): HoprDB {
    const mock: HoprDB = {
      id: id ?? PublicKey.createMock(),
      db: new levelup(MemDown())
    } as any
    Object.setPrototypeOf(mock, HoprDB.prototype)

    return mock
  }

  public async getChannelX(src: PublicKey, dest: PublicKey): Promise<ChannelEntry> {
    return await this.getChannel(generateChannelId(src.toAddress(), dest.toAddress()))
  }

  public async getChannelTo(dest: PublicKey): Promise<ChannelEntry> {
    return await this.getChannel(generateChannelId(this.id.toAddress(), dest.toAddress()))
  }

  public async getChannelFrom(src: PublicKey): Promise<ChannelEntry> {
    return await this.getChannel(generateChannelId(src.toAddress(), this.id.toAddress()))
  }

  public async getChannelsFrom(address: Address) {
    return this.getChannels((channel) => {
      return address.eq(channel.source.toAddress())
    })
  }

  public async getChannelsTo(address: Address) {
    return this.getChannels((channel) => {
      return address.eq(channel.destination.toAddress())
    })
  }

  public async setEnvironmentId(environment_id: string): Promise<void> {
    await this.put(ENVIRONMENT_KEY, encoder.encode(environment_id))
  }

  public async getEnvironmentId(): Promise<string> {
    return decoder.decode(await this.maybeGet(ENVIRONMENT_KEY))
  }

  public async verifyEnvironmentId(expectedId: string): Promise<boolean> {
    const storedId = await this.getEnvironmentId()

    if (storedId == undefined) {
      return false
    }

    return storedId === expectedId
  }

  public async getHoprBalance(): Promise<Balance> {
    return this.getCoercedOrDefault(HOPR_BALANCE_KEY, Balance.deserialize, Balance.ZERO())
  }

  public async setHoprBalance(value: Balance): Promise<void> {
    return this.put(HOPR_BALANCE_KEY, value.serialize())
  }

  public async addHoprBalance(value: Balance): Promise<void> {
    return this.addBalance(HOPR_BALANCE_KEY, value)
  }

  public async subHoprBalance(value: Balance): Promise<void> {
    return this.subBalance(HOPR_BALANCE_KEY, value)
  }
}
