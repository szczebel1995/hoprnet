/**
 * At the moment, using our own custom codes
 * and validations in the possibilty we want to
 * reuse the code for commands, will change if said
 * otherwise.
 */
export const STATUS_CODES = {
  // invalid inputs
  INVALID_PEERID: 'INVALID_PEERID',
  INVALID_CURRENCY: 'INVALID_CURRENCY',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  INVALID_ADDRESS: 'INVALID_ADDRESS',
  INVALID_SETTING: 'INVALID_SETTING',
  INVALID_SETTING_VALUE: 'INVALID_SETTING_VALUE',
  // protocol
  PEERID_NOT_FOUND: 'PEERID_NOT_FOUND',
  NOT_ENOUGH_BALANCE: 'NOT_ENOUGH_BALANCE',
  CHANNEL_ALREADY_OPEN: 'CHANNEL_ALREADY_OPEN',
  TIMEOUT: 'TIMEOUT',
  // other
  UNKNOWN_FAILURE: 'UNKNOWN_FAILURE'
}
