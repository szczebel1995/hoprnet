import type Hopr from '@hoprnet/hopr-core'
import { PassiveStrategy, PromiscuousStrategy } from '@hoprnet/hopr-core'
import type { Operation } from 'express-openapi'
import { STATUS_CODES } from '../../'
import type { State, StateOps } from '../../../../types'

export interface Setting {
  name: string
  value: any
}

export const getSetting = ({
  node,
  state,
  settingName
}: {
  node: Hopr
  state: State
  settingName?: keyof State['settings']
}) => {
  const getSettingByName = (name: string): Setting => {
    if (name) {
      const setting = state.settings[name]

      if (typeof setting === 'undefined') {
        throw Error(STATUS_CODES.INVALID_SETTING)
      }

      if (name === 'strategy') {
        return { name, value: node.getChannelStrategy() }
      } else {
        return { name, value: setting }
      }
    }
  }

  if (!settingName) {
    const settingsNames: (keyof State['settings'])[] = ['includeRecipient', 'strategy']
    return settingsNames.map(getSettingByName)
  }

  return getSettingByName(settingName)
}

export const setSetting = ({
  node,
  settingName,
  stateOps,
  value
}: {
  settingName: keyof State['settings']
  value: any
  node: Hopr
  stateOps: StateOps
}) => {
  const state = stateOps.getState()
  if (typeof state.settings[settingName] === 'undefined') {
    throw Error(STATUS_CODES.INVALID_SETTING)
  }

  switch (settingName) {
    case 'includeRecipient':
      if (typeof value !== 'boolean') throw Error(STATUS_CODES.INVALID_SETTING_VALUE)
      state.settings[settingName] = value
      break
    case 'strategy':
      let strategy

      switch (value) {
        case 'passive':
          strategy = new PassiveStrategy()
          break
        case 'promiscuous':
          strategy = new PromiscuousStrategy()
          break
      }
      if (!strategy) throw Error(STATUS_CODES.INVALID_SETTING_VALUE)
      node.setChannelStrategy(strategy)
      state.settings[settingName] = value
      break
  }

  stateOps.setState(state)
}

export const GET: Operation = [
  async (req, res, _next) => {
    const { stateOps, node } = req.context
    const { settingName } = req.query

    try {
      const setting = getSetting({
        node,
        state: stateOps.getState(),
        settingName: settingName as keyof State['settings']
      })
      return res
        .status(200)
        .send({ status: STATUS_CODES.SUCCESS, settings: Array.isArray(setting) ? setting : [setting] })
    } catch (error) {
      return res
        .status(error.message === STATUS_CODES.INVALID_SETTING ? 400 : 500)
        .send({ status: STATUS_CODES[error.message] || STATUS_CODES.UNKNOWN_FAILURE, error: error.message })
    }
  }
]

GET.apiDoc = {
  description: 'Get setting value',
  tags: ['node'],
  operationId: 'getSetting',
  parameters: [
    {
      name: 'settingName',
      in: 'query',
      description: 'Setting name that we want to fetch value for',
      schema: {
        type: 'string',
        example: 'includeRecipient'
      }
    }
  ],
  responses: {
    '200': {
      description: 'Alias/es fetched succesfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              settings: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Setting'
                },
                description: 'Setting/s fetched'
              }
            }
          }
        }
      }
    },
    '400': {
      description: 'Invalid input',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/StatusResponse'
          },
          example: { status: STATUS_CODES.INVALID_SETTING }
        }
      }
    }
  }
}

export const POST: Operation = [
  async (req, res, _next) => {
    const { stateOps, node } = req.context
    const { settingName, value } = req.body

    try {
      setSetting({ node, stateOps, value, settingName })
      return res.status(200).send({ status: STATUS_CODES.SUCCESS })
    } catch (error) {
      const invalidDataErrors = [STATUS_CODES.INVALID_SETTING_VALUE, STATUS_CODES.INVALID_SETTING]
      return res
        .status(invalidDataErrors.includes(error.message) ? 400 : 500)
        .send({ status: STATUS_CODES[error.message] || STATUS_CODES.UNKNOWN_FAILURE, error: error.message })
    }
  }
]

POST.apiDoc = {
  description: 'Change setting value',
  tags: ['node'],
  operationId: 'setSetting',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Setting'
        }
      }
    }
  },
  responses: {
    '200': {
      description: 'Setting set succesfully'
      // content: {
      //   'application/json': {
      //     schema: {
      //       $ref: '#/components/schemas/StatusResponse'
      //     }
      //   }
      // }
    },
    '400': {
      description: 'Invalid input',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/StatusResponse'
          },
          example: {
            status: `${STATUS_CODES.INVALID_SETTING} | ${STATUS_CODES.INVALID_SETTING_VALUE}`
          }
        }
      }
    }
  }
}
