import Hopr from '@hoprnet/hopr-core'
import { Operation } from 'express-openapi'
import PeerId from 'peer-id'
import { STATUS_CODES } from '../../'

/**
 * Pings another node to check its availability.
 * @returns Latency if ping was successfull.
 */
export const ping = async ({ node, peerId }: { node: Hopr; peerId: string }) => {
  let validPeerId: PeerId
  try {
    validPeerId = PeerId.createFromB58String(peerId)
  } catch (err) {
    throw Error(STATUS_CODES.INVALID_PEERID)
  }

  let pingResult: Awaited<ReturnType<Hopr['ping']>>
  let error: any

  try {
    pingResult = await node.ping(validPeerId)
  } catch (err) {
    error = err
  }

  if (pingResult.latency >= 0) {
    return { latency: pingResult.latency }
  }

  if (error && error.message) {
    throw error
  }
  throw Error(STATUS_CODES.TIMEOUT)
}

export const GET: Operation = [
  async (req, res, _next) => {
    const { node } = req.context
    const { peerId } = req.query

    if (!peerId) {
      return res.status(400).send({ status: STATUS_CODES.INVALID_PEERID })
    }

    try {
      const pingRes = await ping({ peerId: peerId as string, node })
      return res.status(200).send(pingRes)
    } catch (error) {
      if (STATUS_CODES[error.message]) {
        return res
          .status(error.message.includes(STATUS_CODES.INVALID_PEERID) ? 400 : 422)
          .send({ status: STATUS_CODES[error.message] })
      } else {
        return res.status(422).send({ status: STATUS_CODES.UNKNOWN_FAILURE, error: error.message })
      }
    }
  }
]

GET.apiDoc = {
  description: 'Pings another node to check its availability.',
  tags: ['Node'],
  operationId: 'ping',
  parameters: [
    {
      name: 'peerId',
      in: 'query',
      description: 'PeerId associated to the other node that we want to ping.',
      required: true,
      schema: {
        type: 'string',
        example: '16Uiu2HAmRFjDov6sbcZeppbnNFFTdx5hFoBzr8csBgevtKUex8y9'
      }
    }
  ],
  responses: {
    '200': {
      description: 'Ping successful.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              latency: {
                type: 'number',
                example: 10,
                description: 'Number of miliseconds it took to get the response from the pinged node.'
              }
            }
          }
        }
      }
    },
    '400': {
      description: 'Invalid peerId.',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/StatusResponse'
          },
          example: { status: STATUS_CODES.INVALID_PEERID }
        }
      }
    },
    '422': {
      description: `Timout, node with specified PeerId didn't respond in time.`,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/StatusResponse'
          },
          example: { status: STATUS_CODES.TIMEOUT }
        }
      }
    }
  }
}
