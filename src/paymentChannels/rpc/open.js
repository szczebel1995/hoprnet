'use strict'

const pull = require('pull-stream')
const lp = require('pull-length-prefixed')

const chalk = require('chalk')

const { randomBytes } = require('crypto')
const { toWei } = require('web3-utils')
const BN = require('bn.js')
const secp256k1 = require('secp256k1')

const { bufferToNumber, numberToBuffer } = require('../../utils')
const { PROTOCOL_PAYMENT_CHANNEL } = require('../../constants')
const Transaction = require('../../transaction')

const OPENING_TIMEOUT = 6 * 60 * 1000

module.exports = self => to =>
    new Promise(async (resolve, reject) => {
        let restoreTx, conn

        const timeout = setTimeout(
            () =>
                reject(
                    Error(
                        `Unable to open a payment channel because counterparty ${chalk.blue(to.toB58String())} is not answering with an appropriate response.`
                    )
                ),
            OPENING_TIMEOUT
        )
        try {
            conn = await self.node.peerRouting.findPeer(to).then(peerInfo => self.node.dialProtocol(peerInfo, PROTOCOL_PAYMENT_CHANNEL))
        } catch (err) {
            return reject(err)
        }

        restoreTx = Transaction.create(
            randomBytes(Transaction.NONCE_LENGTH),
            numberToBuffer(1, Transaction.INDEX_LENGTH),
            new BN(toWei('1', 'shannon')).toBuffer('be', Transaction.VALUE_LENGTH),

            // 0 is considered as infinity point / neutral element
            Buffer.alloc(33, 0)
        ).sign(self.node.peerInfo.id)

        pull(
            pull.once(restoreTx.toBuffer()),
            lp.encode(),
            conn,
            lp.decode({
                maxLength: Transaction.SIGNATURE_LENGTH + Transaction.RECOVERY_LENGTH
            }),
            pull.filter(
                data =>
                    Buffer.isBuffer(data) &&
                    data.length === Transaction.SIGNATURE_LENGTH + Transaction.RECOVERY_LENGTH &&
                    secp256k1
                        .recover(restoreTx.hash, data.slice(0, Transaction.SIGNATURE_LENGTH), bufferToNumber(data.slice(Transaction.SIGNATURE_LENGTH)))
                        .compare(to.pubKey.marshal()) === 0
            ),
            pull.drain(signature => {
                restoreTx.signature = signature.slice(0, Transaction.SIGNATURE_LENGTH)
                restoreTx.recovery = signature.slice(Transaction.SIGNATURE_LENGTH)

                const channelId = restoreTx.getChannelId(self.node.peerInfo.id)

                self.registerSettlementListener(channelId)
                self.registerOpeningListener(channelId)

                const openingListener = () => {
                    const promise = Promise.all([
                        self.node.db.put(self.node.paymentChannels.StashedRestoreTransaction(channelId), restoreTx.toBuffer(), { sync: true }),
                        self.contractCall(
                            self.contract.methods.createFunded(
                                restoreTx.nonce,
                                new BN(restoreTx.value).toString(),
                                restoreTx.signature.slice(0, 32),
                                restoreTx.signature.slice(32, 64),
                                bufferToNumber(restoreTx.recovery) + 27
                            )
                        )
                    ])
                    return () => {
                        clearTimeout(timeout)
                        resolve(promise)
                    }
                }

                self.once(`opened ${channelId.toString('base64')}`, openingListener())

                // Closes the stream
                return false
            })
        )
    })
