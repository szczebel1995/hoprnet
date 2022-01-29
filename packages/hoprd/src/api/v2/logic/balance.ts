import Hopr from '@hoprnet/hopr-core'

export interface Balances {
  native: string
  hopr: string
}

export const getBalances = async (node: Hopr): Promise<Balances | Error> => {
  try {
    const hoprBalance = (await node.getBalance()).toFormattedString()
    const nativeBalance = (await node.getNativeBalance()).toFormattedString()
    return { native: nativeBalance, hopr: hoprBalance }
  } catch (error) {
    return new Error('failure')
  }
}
