import assert from 'assert'
import BN from 'bn.js'
import sinon from 'sinon'
import { Balance, NativeBalance } from '@hoprnet/hopr-utils'
import { STATUS_CODES } from '../'
import { withdraw } from './withdraw'

const alice = '0x07c97c4f845b4698D79036239153bB381bc72ad3'

let node = sinon.fake() as any
node.withdraw = sinon.fake.returns('receipt')
node.getNativeBalance = sinon.fake.returns(Promise.resolve(new NativeBalance(new BN('10'))))
node.getBalance = sinon.fake.returns(Promise.resolve(new Balance(new BN('10'))))

describe('withdraw', () => {
  it('should withdraw HOPR successfuly', async () => {
    const receipt = await withdraw(node, 'HOPR', alice, '1')
    assert.equal(receipt, 'receipt')
  })

  it('should withdraw NATIVE successfuly', async () => {
    const receipt = await withdraw(node, 'NATIVE', alice, '1')
    assert.equal(receipt, 'receipt')
  })

  it('should reject on invalid arguments', async () => {
    assert.rejects(() => {
      return withdraw(node, 'invalidCurrency' as unknown as 'NATIVE', alice, '1')
    }, STATUS_CODES.INVALID_CURRENCY)
    assert.rejects(() => {
      return withdraw(node, 'HOPR', '0x00', '1')
    }, STATUS_CODES.INVALID_ADDRESS)
    assert.rejects(() => {
      return withdraw(node, 'NATIVE', alice, 'abc')
    }, STATUS_CODES.INVALID_AMOUNT)
  })

  it('should return error when withdrawing more than balance or address incorrect', async () => {
    assert.rejects(() => {
      return withdraw(node, 'NATIVE', alice, '100')
    }, STATUS_CODES.NOT_ENOUGH_BALANCE)
  })

  it('should return error when node call fails', async () => {
    node.withdraw = sinon.fake.throws('')
    assert.rejects(() => {
      return withdraw(node, 'NATIVE', alice, '100')
    }, STATUS_CODES.UNKNOWN_FAILURE)
  })
})
