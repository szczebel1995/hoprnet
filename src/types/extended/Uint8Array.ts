import { u8aToHex } from 'src/core/u8a'

class Uint8ArrayE extends Uint8Array {
  subarray(begin: number = 0, end?: number) {
    return new Uint8Array(this.buffer, begin + this.byteOffset, end != null ? end - begin : undefined)
  }

  toU8a() {
    return new Uint8Array(this)
  }

  toHex() {
    return u8aToHex(this)
  }
}

export default Uint8ArrayE
