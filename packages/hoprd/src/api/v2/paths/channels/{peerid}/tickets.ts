import type Hopr from '@hoprnet/hopr-core'
import type { Operation } from 'express-openapi'
import PeerId from 'peer-id'
import { STATUS_CODES } from '../../../'
import { formatTicket } from '../../tickets'

export const getTickets = async (node: Hopr, peerId: string) => {
  const tickets = await node.getTickets(PeerId.createFromB58String(peerId))
  return tickets.map(formatTicket)
}

export const GET: Operation = [
  async (req, res, _next) => {
    const { node } = req.context
    const { peerid } = req.params

    try {
      const tickets = await getTickets(node, peerid)
      return res.status(200).send(tickets)
    } catch (err) {
      return res.status(422).send({ status: STATUS_CODES.UNKNOWN_FAILURE, error: err.message })
    }
  }
]

GET.apiDoc = {
  description: 'Get tickets earned by relaying data packets by your node for the particular channel.',
  tags: ['Channels'],
  operationId: 'channelsGetTickets',
  responses: {
    '200': {
      description: 'Tickets fetched successfully.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Ticket'
            }
          }
        }
      }
    },
    '422': {
      description: 'Unknown failure.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: { type: 'string', example: STATUS_CODES.UNKNOWN_FAILURE },
              error: { type: 'string', example: 'Full error message.' }
            }
          },
          example: { status: STATUS_CODES.UNKNOWN_FAILURE, error: 'Full error message.' }
        }
      }
    }
  }
}
