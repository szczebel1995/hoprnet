import assert from 'assert'
import sinon from 'sinon'
import PeerId from 'peer-id'
import { listChannels } from './list'
import { ChannelEntry } from '@hoprnet/hopr-utils'

const SELF = PeerId.createFromB58String('16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12')

let node = sinon.fake() as any
node.getId = sinon.fake.returns(SELF)

describe('listChannels', function () {
  it('should get channels list', async function () {
    const testChannel = ChannelEntry.createMock()
    //@ts-ignore
    testChannel.status = 2
    node.getChannelsFrom = sinon.fake.returns(Promise.resolve([testChannel]))
    node.getChannelsTo = sinon.fake.returns(Promise.resolve([testChannel]))
    const { incoming, outgoing } = await listChannels(node)

    assert.equal(incoming.length, 1)
    assert.equal(outgoing.length, 1)
  })
})
