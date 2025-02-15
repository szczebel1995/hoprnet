[@hoprnet/hopr-utils](../README.md) / [Exports](../modules.md) / PublicKey

# Class: PublicKey

## Table of contents

### Constructors

- [constructor](PublicKey.md#constructor)

### Accessors

- [SIZE](PublicKey.md#size)

### Methods

- [eq](PublicKey.md#eq)
- [serialize](PublicKey.md#serialize)
- [toAddress](PublicKey.md#toaddress)
- [toB58String](PublicKey.md#tob58string)
- [toHex](PublicKey.md#tohex)
- [toPeerId](PublicKey.md#topeerid)
- [toString](PublicKey.md#tostring)
- [toUncompressedPubKeyHex](PublicKey.md#touncompressedpubkeyhex)
- [createMock](PublicKey.md#createmock)
- [deserialize](PublicKey.md#deserialize)
- [fromPeerId](PublicKey.md#frompeerid)
- [fromPeerIdString](PublicKey.md#frompeeridstring)
- [fromPrivKey](PublicKey.md#fromprivkey)
- [fromSignature](PublicKey.md#fromsignature)
- [fromString](PublicKey.md#fromstring)
- [fromUncompressedPubKey](PublicKey.md#fromuncompressedpubkey)

## Constructors

### constructor

• **new PublicKey**(`arr`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `Uint8Array` |

#### Defined in

[types/primitives.ts:12](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L12)

## Accessors

### SIZE

• `Static` `get` **SIZE**(): `number`

#### Returns

`number`

#### Defined in

[types/primitives.ts:68](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L68)

## Methods

### eq

▸ **eq**(`b`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | [`PublicKey`](PublicKey.md) |

#### Returns

`boolean`

#### Defined in

[types/primitives.ts:88](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L88)

___

### serialize

▸ **serialize**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[types/primitives.ts:72](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L72)

___

### toAddress

▸ **toAddress**(): [`Address`](Address.md)

#### Returns

[`Address`](Address.md)

#### Defined in

[types/primitives.ts:48](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L48)

___

### toB58String

▸ **toB58String**(): `string`

#### Returns

`string`

#### Defined in

[types/primitives.ts:84](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L84)

___

### toHex

▸ **toHex**(): `string`

#### Returns

`string`

#### Defined in

[types/primitives.ts:76](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L76)

___

### toPeerId

▸ **toPeerId**(): `PeerId`

#### Returns

`PeerId`

#### Defined in

[types/primitives.ts:57](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L57)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[types/primitives.ts:80](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L80)

___

### toUncompressedPubKeyHex

▸ **toUncompressedPubKeyHex**(): `string`

#### Returns

`string`

#### Defined in

[types/primitives.ts:52](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L52)

___

### createMock

▸ `Static` **createMock**(): [`PublicKey`](PublicKey.md)

#### Returns

[`PublicKey`](PublicKey.md)

#### Defined in

[types/primitives.ts:96](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L96)

___

### deserialize

▸ `Static` **deserialize**(`arr`): [`PublicKey`](PublicKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `Uint8Array` |

#### Returns

[`PublicKey`](PublicKey.md)

#### Defined in

[types/primitives.ts:92](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L92)

___

### fromPeerId

▸ `Static` **fromPeerId**(`peerId`): [`PublicKey`](PublicKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `peerId` | `PeerId` |

#### Returns

[`PublicKey`](PublicKey.md)

#### Defined in

[types/primitives.ts:34](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L34)

___

### fromPeerIdString

▸ `Static` **fromPeerIdString**(`peerIdString`): [`PublicKey`](PublicKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `peerIdString` | `string` |

#### Returns

[`PublicKey`](PublicKey.md)

#### Defined in

[types/primitives.ts:38](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L38)

___

### fromPrivKey

▸ `Static` **fromPrivKey**(`privKey`): [`PublicKey`](PublicKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `privKey` | `Uint8Array` |

#### Returns

[`PublicKey`](PublicKey.md)

#### Defined in

[types/primitives.ts:18](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L18)

___

### fromSignature

▸ `Static` **fromSignature**(`hash`, `r`, `s`, `v`): [`PublicKey`](PublicKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `r` | `string` |
| `s` | `string` |
| `v` | `number` |

#### Returns

[`PublicKey`](PublicKey.md)

#### Defined in

[types/primitives.ts:42](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L42)

___

### fromString

▸ `Static` **fromString**(`str`): [`PublicKey`](PublicKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`PublicKey`](PublicKey.md)

#### Defined in

[types/primitives.ts:61](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L61)

___

### fromUncompressedPubKey

▸ `Static` **fromUncompressedPubKey**(`arr`): [`PublicKey`](PublicKey.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `Uint8Array` |

#### Returns

[`PublicKey`](PublicKey.md)

#### Defined in

[types/primitives.ts:26](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/primitives.ts#L26)
