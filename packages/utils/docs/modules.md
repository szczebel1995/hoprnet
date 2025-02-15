[@hoprnet/hopr-utils](README.md) / Exports

# @hoprnet/hopr-utils

## Table of contents

### References

- [DialOpts](modules.md#dialopts)

### Enumerations

- [ChannelStatus](enums/ChannelStatus.md)
- [DialStatus](enums/DialStatus.md)

### Classes

- [AccountEntry](classes/AccountEntry.md)
- [AcknowledgedTicket](classes/AcknowledgedTicket.md)
- [Address](classes/Address.md)
- [Balance](classes/Balance.md)
- [Challenge](classes/Challenge.md)
- [ChannelEntry](classes/ChannelEntry.md)
- [CurvePoint](classes/CurvePoint.md)
- [EthereumChallenge](classes/EthereumChallenge.md)
- [HalfKey](classes/HalfKey.md)
- [HalfKeyChallenge](classes/HalfKeyChallenge.md)
- [Hash](classes/Hash.md)
- [HoprDB](classes/HoprDB.md)
- [NativeBalance](classes/NativeBalance.md)
- [PRG](classes/PRG.md)
- [PRP](classes/PRP.md)
- [PublicKey](classes/PublicKey.md)
- [Response](classes/Response.md)
- [Signature](classes/Signature.md)
- [Snapshot](classes/Snapshot.md)
- [Ticket](classes/Ticket.md)
- [UINT256](classes/UINT256.md)
- [UnacknowledgedTicket](classes/UnacknowledgedTicket.md)

### Interfaces

- [FIFO](interfaces/FIFO.md)
- [Intermediate](interfaces/Intermediate.md)
- [NetOptions](interfaces/NetOptions.md)

### Type aliases

- [AddressSorter](modules.md#addresssorter)
- [DeferType](modules.md#defertype)
- [DialResponse](modules.md#dialresponse)
- [Hosts](modules.md#hosts)
- [LibP2PHandlerArgs](modules.md#libp2phandlerargs)
- [LibP2PHandlerFunction](modules.md#libp2phandlerfunction)
- [Network](modules.md#network)
- [PRGParameters](modules.md#prgparameters)
- [PRPParameters](modules.md#prpparameters)
- [PendingAckowledgement](modules.md#pendingackowledgement)
- [TimeoutOpts](modules.md#timeoutopts)
- [U8aAndSize](modules.md#u8aandsize)
- [WaitingAsRelayer](modules.md#waitingasrelayer)
- [WaitingAsSender](modules.md#waitingassender)
- [libp2pSendMessage](modules.md#libp2psendmessage)
- [libp2pSubscribe](modules.md#libp2psubscribe)

### Variables

- [ADDRESS\_LENGTH](modules.md#address_length)
- [A\_EQUALS\_B](modules.md#a_equals_b)
- [A\_STRICLY\_LESS\_THAN\_B](modules.md#a_stricly_less_than_b)
- [A\_STRICTLY\_GREATER\_THAN\_B](modules.md#a_strictly_greater_than_b)
- [HASH\_LENGTH](modules.md#hash_length)
- [INVERSE\_TICKET\_WIN\_PROB](modules.md#inverse_ticket_win_prob)
- [LENGTH\_PREFIX\_LENGTH](modules.md#length_prefix_length)
- [LINK\_LOCAL\_NETWORKS](modules.md#link_local_networks)
- [LOOPBACK\_ADDRS](modules.md#loopback_addrs)
- [MAX\_AUTO\_CHANNELS](modules.md#max_auto_channels)
- [MAX\_RANDOM\_BIGINTEGER](modules.md#max_random_biginteger)
- [MAX\_RANDOM\_INTEGER](modules.md#max_random_integer)
- [MINIMUM\_REASONABLE\_CHANNEL\_STAKE](modules.md#minimum_reasonable_channel_stake)
- [MIN\_NATIVE\_BALANCE](modules.md#min_native_balance)
- [MULTI\_ADDR\_MAX\_LENGTH](modules.md#multi_addr_max_length)
- [POR\_STRING\_LENGTH](modules.md#por_string_length)
- [PRG\_COUNTER\_LENGTH](modules.md#prg_counter_length)
- [PRG\_IV\_LENGTH](modules.md#prg_iv_length)
- [PRG\_KEY\_LENGTH](modules.md#prg_key_length)
- [PRICE\_PER\_PACKET](modules.md#price_per_packet)
- [PRIVATE\_KEY\_LENGTH](modules.md#private_key_length)
- [PRIVATE\_NETWORK](modules.md#private_network)
- [PRP\_IV\_LENGTH](modules.md#prp_iv_length)
- [PRP\_KEY\_LENGTH](modules.md#prp_key_length)
- [PRP\_MIN\_LENGTH](modules.md#prp_min_length)
- [PUBLIC\_KEY\_LENGTH](modules.md#public_key_length)
- [RESERVED\_ADDRS](modules.md#reserved_addrs)
- [SECP256K1\_CONSTANTS](modules.md#secp256k1_constants)
- [SECRET\_LENGTH](modules.md#secret_length)
- [SIGNATURE\_LENGTH](modules.md#signature_length)
- [SIGNATURE\_RECOVERY\_LENGTH](modules.md#signature_recovery_length)
- [SUGGESTED\_BALANCE](modules.md#suggested_balance)
- [SUGGESTED\_NATIVE\_BALANCE](modules.md#suggested_native_balance)
- [UNCOMPRESSED\_PUBLIC\_KEY\_LENGTH](modules.md#uncompressed_public_key_length)
- [b58StringRegex](modules.md#b58stringregex)
- [dbMock](modules.md#dbmock)
- [durations](modules.md#durations)

### Functions

- [FIFO](modules.md#fifo)
- [abortableTimeout](modules.md#abortabletimeout)
- [cacheNoArgAsyncFunction](modules.md#cachenoargasyncfunction)
- [checkNetworks](modules.md#checknetworks)
- [convertPubKeyFromB58String](modules.md#convertpubkeyfromb58string)
- [convertPubKeyFromPeerId](modules.md#convertpubkeyfrompeerid)
- [createPacket](modules.md#createpacket)
- [createPoRString](modules.md#createporstring)
- [createPoRValuesForSender](modules.md#createporvaluesforsender)
- [createRelayerKey](modules.md#createrelayerkey)
- [debug](modules.md#debug)
- [decodePoRBytes](modules.md#decodeporbytes)
- [defer](modules.md#defer)
- [deriveAckKeyShare](modules.md#deriveackkeyshare)
- [deriveCommitmentSeed](modules.md#derivecommitmentseed)
- [deserializeKeyPair](modules.md#deserializekeypair)
- [dial](modules.md#dial)
- [expandVars](modules.md#expandvars)
- [forwardTransform](modules.md#forwardtransform)
- [gcd](modules.md#gcd)
- [generateChannelId](modules.md#generatechannelid)
- [generateKeyShares](modules.md#generatekeyshares)
- [getB58String](modules.md#getb58string)
- [getHeaderLength](modules.md#getheaderlength)
- [getIpv4LocalAddressClass](modules.md#getipv4localaddressclass)
- [getLocalAddresses](modules.md#getlocaladdresses)
- [getLocalHosts](modules.md#getlocalhosts)
- [getNetworkPrefix](modules.md#getnetworkprefix)
- [getPacketLength](modules.md#getpacketlength)
- [getPrivateAddresses](modules.md#getprivateaddresses)
- [getPublicAddresses](modules.md#getpublicaddresses)
- [hasB58String](modules.md#hasb58string)
- [inSameNetwork](modules.md#insamenetwork)
- [ipToU8aAddress](modules.md#iptou8aaddress)
- [isAnyAddress](modules.md#isanyaddress)
- [isErrorOutOfFunds](modules.md#iserroroutoffunds)
- [isErrorOutOfHoprFunds](modules.md#iserroroutofhoprfunds)
- [isErrorOutOfNativeFunds](modules.md#iserroroutofnativefunds)
- [isExpired](modules.md#isexpired)
- [isLinkLocaleAddress](modules.md#islinklocaleaddress)
- [isLocalhost](modules.md#islocalhost)
- [isMultiaddrLocal](modules.md#ismultiaddrlocal)
- [isPrivateAddress](modules.md#isprivateaddress)
- [isReservedAddress](modules.md#isreservedaddress)
- [isSecp256k1PeerId](modules.md#issecp256k1peerid)
- [iterateHash](modules.md#iteratehash)
- [lengthPrefixedToU8a](modules.md#lengthprefixedtou8a)
- [libp2pSendMessage](modules.md#libp2psendmessage)
- [libp2pSubscribe](modules.md#libp2psubscribe)
- [loadJson](modules.md#loadjson)
- [localAddressesFirst](modules.md#localaddressesfirst)
- [moveDecimalPoint](modules.md#movedecimalpoint)
- [multiaddressCompareByClassFunction](modules.md#multiaddresscomparebyclassfunction)
- [nAtATime](modules.md#natatime)
- [oneAtATime](modules.md#oneatatime)
- [ordered](modules.md#ordered)
- [parseHosts](modules.md#parsehosts)
- [parseJSON](modules.md#parsejson)
- [pendingAcknowledgement](modules.md#pendingacknowledgement)
- [pickVersion](modules.md#pickversion)
- [preVerify](modules.md#preverify)
- [prefixLength](modules.md#prefixlength)
- [privKeyToPeerId](modules.md#privkeytopeerid)
- [pubKeyToPeerId](modules.md#pubkeytopeerid)
- [randomBigInteger](modules.md#randombiginteger)
- [randomChoice](modules.md#randomchoice)
- [randomFloat](modules.md#randomfloat)
- [randomInteger](modules.md#randominteger)
- [randomPermutation](modules.md#randompermutation)
- [randomSubset](modules.md#randomsubset)
- [recoverIteratedHash](modules.md#recoveriteratedhash)
- [retimer](modules.md#retimer)
- [retryWithBackoff](modules.md#retrywithbackoff)
- [sampleGroupElement](modules.md#samplegroupelement)
- [serializeKeyPair](modules.md#serializekeypair)
- [serializeToU8a](modules.md#serializetou8a)
- [startResourceUsageLogger](modules.md#startresourceusagelogger)
- [stringToU8a](modules.md#stringtou8a)
- [timeoutAfter](modules.md#timeoutafter)
- [timer](modules.md#timer)
- [toLengthPrefixedU8a](modules.md#tolengthprefixedu8a)
- [toNetworkPrefix](modules.md#tonetworkprefix)
- [toU8a](modules.md#tou8a)
- [u8aAdd](modules.md#u8aadd)
- [u8aAddrToString](modules.md#u8aaddrtostring)
- [u8aAddressToCIDR](modules.md#u8aaddresstocidr)
- [u8aAllocate](modules.md#u8aallocate)
- [u8aCompare](modules.md#u8acompare)
- [u8aConcat](modules.md#u8aconcat)
- [u8aEquals](modules.md#u8aequals)
- [u8aSplit](modules.md#u8asplit)
- [u8aToHex](modules.md#u8atohex)
- [u8aToNumber](modules.md#u8atonumber)
- [u8aToNumberOrBigInt](modules.md#u8atonumberorbigint)
- [u8aXOR](modules.md#u8axor)
- [validateData](modules.md#validatedata)
- [validatePoRHalfKeys](modules.md#validateporhalfkeys)
- [validatePoRHint](modules.md#validateporhint)
- [validatePoRResponse](modules.md#validateporresponse)
- [verifySignatureFromPeerId](modules.md#verifysignaturefrompeerid)
- [wait](modules.md#wait)

## References

### DialOpts

Renames and re-exports [TimeoutOpts](modules.md#timeoutopts)

## Type aliases

### AddressSorter

Ƭ **AddressSorter**: (`input`: `Address`[]) => `Address`[]

#### Type declaration

▸ (`input`): `Address`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Address`[] |

##### Returns

`Address`[]

#### Defined in

[libp2p/addressSorters.ts:98](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/addressSorters.ts#L98)

___

### DeferType

Ƭ **DeferType**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`<`T`\> |
| `reject` | (`reason?`: `any`) => `void` |
| `resolve` | (`value?`: `T` \| `PromiseLike`<`T`\>) => `void` |

#### Defined in

[async/defer.ts:1](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/defer.ts#L1)

___

### DialResponse

Ƭ **DialResponse**: { `resp`: `Awaited`<`ReturnType`<`LibP2P`[``"dialProtocol"``]\>\> ; `status`: [`SUCCESS`](enums/DialStatus.md#success)  } \| { `status`: [`TIMEOUT`](enums/DialStatus.md#timeout)  } \| { `status`: [`ABORTED`](enums/DialStatus.md#aborted)  } \| { `dhtContacted`: `boolean` ; `status`: [`DIAL_ERROR`](enums/DialStatus.md#dial_error)  } \| { `query`: `PeerId` ; `status`: [`DHT_ERROR`](enums/DialStatus.md#dht_error)  }

#### Defined in

[libp2p/dialHelper.ts:34](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/dialHelper.ts#L34)

___

### Hosts

Ƭ **Hosts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ip4?` | [`NetOptions`](interfaces/NetOptions.md) |
| `ip6?` | [`NetOptions`](interfaces/NetOptions.md) |

#### Defined in

[network/hosts.ts:6](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/hosts.ts#L6)

___

### LibP2PHandlerArgs

Ƭ **LibP2PHandlerArgs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `protocol` | `string` |
| `stream` | `MuxedStream` |

#### Defined in

[libp2p/index.ts:167](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L167)

___

### LibP2PHandlerFunction

Ƭ **LibP2PHandlerFunction**<`T`\>: (`msg`: `Uint8Array`, `remotePeer`: `PeerId`) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`msg`, `remotePeer`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `Uint8Array` |
| `remotePeer` | `PeerId` |

##### Returns

`T`

#### Defined in

[libp2p/index.ts:168](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L168)

___

### Network

Ƭ **Network**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `family` | `NetworkInterfaceInfo`[``"family"``] |
| `networkPrefix` | `Uint8Array` |
| `subnet` | `Uint8Array` |

#### Defined in

[network/constants.ts:3](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/constants.ts#L3)

___

### PRGParameters

Ƭ **PRGParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `iv` | `Uint8Array` |
| `key` | `Uint8Array` |

#### Defined in

[crypto/prg.ts:11](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/prg.ts#L11)

___

### PRPParameters

Ƭ **PRPParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `iv` | `Uint8Array` |
| `key` | `Uint8Array` |

#### Defined in

[crypto/prp.ts:16](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/prp.ts#L16)

___

### PendingAckowledgement

Ƭ **PendingAckowledgement**: [`WaitingAsSender`](modules.md#waitingassender) \| [`WaitingAsRelayer`](modules.md#waitingasrelayer)

#### Defined in

[db.ts:73](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/db.ts#L73)

___

### TimeoutOpts

Ƭ **TimeoutOpts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signal?` | `AbortSignal` |
| `timeout` | `number` |

#### Defined in

[async/abortableTimeout.ts:5](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/abortableTimeout.ts#L5)

___

### U8aAndSize

Ƭ **U8aAndSize**: [`Uint8Array`, `number`]

#### Defined in

[u8a/index.ts:20](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/index.ts#L20)

___

### WaitingAsRelayer

Ƭ **WaitingAsRelayer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isMessageSender` | ``false`` |
| `ticket` | [`UnacknowledgedTicket`](classes/UnacknowledgedTicket.md) |

#### Defined in

[db.ts:68](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/db.ts#L68)

___

### WaitingAsSender

Ƭ **WaitingAsSender**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isMessageSender` | ``true`` |

#### Defined in

[db.ts:64](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/db.ts#L64)

___

### libp2pSendMessage

Ƭ **libp2pSendMessage**: (`libp2p`: `LibP2P`, `destination`: `PeerId`, `protocol`: `string`, `message`: `Uint8Array`, `includeReply`: ``false``, `opts?`: [`TimeoutOpts`](modules.md#timeoutopts)) => `Promise`<`void`\> & (`libp2p`: `LibP2P`, `destination`: `PeerId`, `protocol`: `string`, `message`: `Uint8Array`, `includeReply`: ``true``, `opts?`: [`TimeoutOpts`](modules.md#timeoutopts)) => `Promise`<`Uint8Array`[]\>

Asks libp2p to establish a connection to another node and
send message. If `includeReply` is set, wait for a response

**`param`** libp2p instance

**`param`** peer to connect to

**`param`** protocol to speak

**`param`** message to send

**`param`** try to receive a reply

**`param`** timeout

#### Defined in

[libp2p/index.ts:105](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L105)

___

### libp2pSubscribe

Ƭ **libp2pSubscribe**: (`libp2p`: `LibP2P`, `protocol`: `string`, `handler`: [`LibP2PHandlerFunction`](modules.md#libp2phandlerfunction)<`Promise`<`void`\> \| `void`\>, `errHandler`: `ErrHandler`, `includeReply`: ``false``) => `void` & (`libp2p`: `LibP2P`, `protocol`: `string`, `handler`: [`LibP2PHandlerFunction`](modules.md#libp2phandlerfunction)<`Promise`<`Uint8Array`\>\>, `errHandler`: `ErrHandler`, `includeReply`: ``true``) => `void`

Generates a handler that pulls messages out of a stream
and feeds them to the given handler.

**`param`** libp2p instance

**`param`** protocol to dial

**`param`** called once another node requests that protocol

**`param`** handle stream pipeline errors

**`param`** try to receive a reply

#### Defined in

[libp2p/index.ts:237](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L237)

## Variables

### ADDRESS\_LENGTH

• **ADDRESS\_LENGTH**: ``20``

#### Defined in

[constants.ts:6](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L6)

___

### A\_EQUALS\_B

• **A\_EQUALS\_B**: ``0``

#### Defined in

[u8a/u8aCompare.ts:2](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/u8aCompare.ts#L2)

___

### A\_STRICLY\_LESS\_THAN\_B

• **A\_STRICLY\_LESS\_THAN\_B**: ``-1``

#### Defined in

[u8a/u8aCompare.ts:1](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/u8aCompare.ts#L1)

___

### A\_STRICTLY\_GREATER\_THAN\_B

• **A\_STRICTLY\_GREATER\_THAN\_B**: ``1``

#### Defined in

[u8a/u8aCompare.ts:3](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/u8aCompare.ts#L3)

___

### HASH\_LENGTH

• **HASH\_LENGTH**: ``32``

#### Defined in

[constants.ts:7](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L7)

___

### INVERSE\_TICKET\_WIN\_PROB

• **INVERSE\_TICKET\_WIN\_PROB**: `BN`

#### Defined in

[constants.ts:16](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L16)

___

### LENGTH\_PREFIX\_LENGTH

• **LENGTH\_PREFIX\_LENGTH**: ``4``

#### Defined in

[u8a/constants.ts:1](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/constants.ts#L1)

___

### LINK\_LOCAL\_NETWORKS

• **LINK\_LOCAL\_NETWORKS**: [`Network`](modules.md#network)[]

#### Defined in

[network/constants.ts:40](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/constants.ts#L40)

___

### LOOPBACK\_ADDRS

• **LOOPBACK\_ADDRS**: [`Network`](modules.md#network)[]

#### Defined in

[network/constants.ts:54](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/constants.ts#L54)

___

### MAX\_AUTO\_CHANNELS

• **MAX\_AUTO\_CHANNELS**: ``5``

#### Defined in

[constants.ts:20](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L20)

___

### MAX\_RANDOM\_BIGINTEGER

• **MAX\_RANDOM\_BIGINTEGER**: `bigint`

Maximum random big integer that can be generated using randomInteger function.

#### Defined in

[crypto/randomInteger.ts:18](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L18)

___

### MAX\_RANDOM\_INTEGER

• **MAX\_RANDOM\_INTEGER**: `bigint`

Maximum random integer that can be generated using randomInteger function.

#### Defined in

[crypto/randomInteger.ts:144](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L144)

___

### MINIMUM\_REASONABLE\_CHANNEL\_STAKE

• **MINIMUM\_REASONABLE\_CHANNEL\_STAKE**: `BN`

#### Defined in

[constants.ts:18](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L18)

___

### MIN\_NATIVE\_BALANCE

• **MIN\_NATIVE\_BALANCE**: `BN`

#### Defined in

[constants.ts:23](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L23)

___

### MULTI\_ADDR\_MAX\_LENGTH

• **MULTI\_ADDR\_MAX\_LENGTH**: ``200``

#### Defined in

[constants.ts:12](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L12)

___

### POR\_STRING\_LENGTH

• **POR\_STRING\_LENGTH**: `number`

#### Defined in

[crypto/por/index.ts:9](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L9)

___

### PRG\_COUNTER\_LENGTH

• **PRG\_COUNTER\_LENGTH**: ``4``

#### Defined in

[crypto/prg.ts:7](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/prg.ts#L7)

___

### PRG\_IV\_LENGTH

• **PRG\_IV\_LENGTH**: ``12``

#### Defined in

[crypto/prg.ts:6](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/prg.ts#L6)

___

### PRG\_KEY\_LENGTH

• **PRG\_KEY\_LENGTH**: ``16``

#### Defined in

[crypto/prg.ts:5](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/prg.ts#L5)

___

### PRICE\_PER\_PACKET

• **PRICE\_PER\_PACKET**: `BN`

#### Defined in

[constants.ts:14](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L14)

___

### PRIVATE\_KEY\_LENGTH

• **PRIVATE\_KEY\_LENGTH**: ``32``

#### Defined in

[constants.ts:3](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L3)

___

### PRIVATE\_NETWORK

• **PRIVATE\_NETWORK**: [`Network`](modules.md#network)[]

#### Defined in

[network/constants.ts:10](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/constants.ts#L10)

___

### PRP\_IV\_LENGTH

• **PRP\_IV\_LENGTH**: `number`

#### Defined in

[crypto/prp.ts:13](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/prp.ts#L13)

___

### PRP\_KEY\_LENGTH

• **PRP\_KEY\_LENGTH**: `number`

#### Defined in

[crypto/prp.ts:12](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/prp.ts#L12)

___

### PRP\_MIN\_LENGTH

• **PRP\_MIN\_LENGTH**: ``32``

#### Defined in

[crypto/prp.ts:14](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/prp.ts#L14)

___

### PUBLIC\_KEY\_LENGTH

• **PUBLIC\_KEY\_LENGTH**: ``33``

#### Defined in

[constants.ts:4](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L4)

___

### RESERVED\_ADDRS

• **RESERVED\_ADDRS**: [`Network`](modules.md#network)[]

#### Defined in

[network/constants.ts:67](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/constants.ts#L67)

___

### SECP256K1\_CONSTANTS

• **SECP256K1\_CONSTANTS**: `Object`

Several ECDSA on secp256k1 related constants

#### Type declaration

| Name | Type |
| :------ | :------ |
| `COMPRESSED_PUBLIC_KEY_LENGTH` | `number` |
| `PRIVATE_KEY_LENGTH` | `number` |
| `RECOVERABLE_SIGNATURE_LENGTH` | `number` |
| `SIGNATURE_LENGTH` | `number` |
| `UNCOMPRESSED_PUBLIC_KEY_LENGTH` | `number` |

#### Defined in

[crypto/constants.ts:4](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/constants.ts#L4)

___

### SECRET\_LENGTH

• **SECRET\_LENGTH**: ``32``

#### Defined in

[constants.ts:8](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L8)

___

### SIGNATURE\_LENGTH

• **SIGNATURE\_LENGTH**: ``64``

#### Defined in

[constants.ts:9](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L9)

___

### SIGNATURE\_RECOVERY\_LENGTH

• **SIGNATURE\_RECOVERY\_LENGTH**: ``1``

#### Defined in

[constants.ts:10](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L10)

___

### SUGGESTED\_BALANCE

• **SUGGESTED\_BALANCE**: `BN`

#### Defined in

[constants.ts:27](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L27)

___

### SUGGESTED\_NATIVE\_BALANCE

• **SUGGESTED\_NATIVE\_BALANCE**: `BN`

#### Defined in

[constants.ts:24](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L24)

___

### UNCOMPRESSED\_PUBLIC\_KEY\_LENGTH

• **UNCOMPRESSED\_PUBLIC\_KEY\_LENGTH**: ``66``

#### Defined in

[constants.ts:5](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/constants.ts#L5)

___

### b58StringRegex

• **b58StringRegex**: `RegExp`

Regular expresion used to match b58Strings

#### Defined in

[libp2p/index.ts:26](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L26)

___

### dbMock

• **dbMock**: [`HoprDB`](classes/HoprDB.md) = `db`

#### Defined in

[db.mock.ts:12](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/db.mock.ts#L12)

___

### durations

• **durations**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `days` | (`days`: `number`) => `number` |
| `hours` | (`hours`: `number`) => `number` |
| `minutes` | (`minutes`: `number`) => `number` |
| `seconds` | (`seconds`: `number`) => `number` |

#### Defined in

[time.ts:1](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/time.ts#L1)

## Functions

### FIFO

▸ **FIFO**<`T`\>(): [`FIFO`](modules.md#fifo)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`FIFO`](modules.md#fifo)<`T`\>

#### Defined in

[collection/fifo.ts:19](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/collection/fifo.ts#L19)

___

### abortableTimeout

▸ **abortableTimeout**<`Result`, `AbortMsg`, `TimeoutMsg`\>(`fn`, `abortMsg`, `timeoutMsg`, `opts`): `Promise`<`Result` \| `AbortMsg` \| `TimeoutMsg`\>

Cals the worker function with a timeout. Once the timeout is done
abort the call using an abort controller.
If the caller aims to end the call before the tiemout has happened
it can pass an AbortController and end the call prematurely.

#### Type parameters

| Name |
| :------ |
| `Result` |
| `AbortMsg` |
| `TimeoutMsg` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`opts`: `Required`<[`TimeoutOpts`](modules.md#timeoutopts)\>) => `Promise`<`Result`\> | worker function to dial |
| `abortMsg` | `AbortMsg` | value to be returned if aborted |
| `timeoutMsg` | `TimeoutMsg` | value to be returned on timeout |
| `opts` | [`TimeoutOpts`](modules.md#timeoutopts) | options to pass to worker function |

#### Returns

`Promise`<`Result` \| `AbortMsg` \| `TimeoutMsg`\>

#### Defined in

[async/abortableTimeout.ts:21](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/abortableTimeout.ts#L21)

___

### cacheNoArgAsyncFunction

▸ **cacheNoArgAsyncFunction**<`T`\>(`func`, `expiry`): () => `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | () => `Promise`<`T`\> |
| `expiry` | `number` |

#### Returns

`fn`

▸ (): `Promise`<`T`\>

##### Returns

`Promise`<`T`\>

#### Defined in

[async/cache.ts:8](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/cache.ts#L8)

___

### checkNetworks

▸ **checkNetworks**(`networks`, `address`, `family`): `boolean`

Checks if given address is in one of the given networks

**`dev`** Used to check if a node is in the same network

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networks` | [`Network`](modules.md#network)[] | network address spaces to check |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if address is at least one of the given networks

#### Defined in

[network/addrs.ts:70](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L70)

___

### convertPubKeyFromB58String

▸ **convertPubKeyFromB58String**(`b58string`): `Promise`<`PublicKey`\>

Takes a B58String and converts them to a PublicKey

#### Parameters

| Name | Type |
| :------ | :------ |
| `b58string` | `string` |

#### Returns

`Promise`<`PublicKey`\>

#### Defined in

[libp2p/index.ts:43](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L43)

___

### convertPubKeyFromPeerId

▸ **convertPubKeyFromPeerId**(`peerId`): `Promise`<`PublicKey`\>

Takes a peerId and returns its corresponding public key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peerId` | `PeerId` | the PeerId used to generate a public key |

#### Returns

`Promise`<`PublicKey`\>

#### Defined in

[libp2p/index.ts:33](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L33)

___

### createPacket

▸ **createPacket**(`secrets`, `alpha`, `msg`, `path`, `maxHops`, `additionalDataRelayerLength`, `additionalDataRelayer`, `additionalDataLastHop?`): `Uint8Array`

Creates a mixnet packet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secrets` | `Uint8Array`[] | - |
| `alpha` | `Uint8Array` | - |
| `msg` | `Uint8Array` | payload to send |
| `path` | `PeerId`[] | nodes to use for relaying, including the final destination |
| `maxHops` | `number` | maximal number of hops to use |
| `additionalDataRelayerLength` | `number` | - |
| `additionalDataRelayer` | `Uint8Array`[] | additional data to put next to each node's routing information |
| `additionalDataLastHop?` | `Uint8Array` | additional data for the final destination |

#### Returns

`Uint8Array`

the packet as u8a

#### Defined in

[crypto/packet/index.ts:65](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/packet/index.ts#L65)

___

### createPoRString

▸ **createPoRString**(`secretC`, `secretD?`): `Uint8Array`

Creates the bitstring containing the PoR challenge for the next
downstream node as well as the hint that is used to verify the
challenge that is given to the relayer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretC` | `Uint8Array` | shared secret with node +2 |
| `secretD?` | `Uint8Array` | shared secret with node +3 |

#### Returns

`Uint8Array`

the bitstring that is embedded next to the routing
information for each relayer

#### Defined in

[crypto/por/index.ts:47](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L47)

___

### createPoRValuesForSender

▸ **createPoRValuesForSender**(`secretB`, `secretC?`): `Object`

Takes the secrets which the first and the second relayer are able
to derive from the packet header and computes the challenge for
the first ticket.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretB` | `Uint8Array` | shared secret with node +1 |
| `secretC?` | `Uint8Array` | shared secret with node +2 |

#### Returns

`Object`

the challenge for the first ticket sent to the first relayer

| Name | Type |
| :------ | :------ |
| `ackChallenge` | [`HalfKeyChallenge`](classes/HalfKeyChallenge.md) |
| `ownKey` | [`HalfKey`](classes/HalfKey.md) |
| `ticketChallenge` | [`Challenge`](classes/Challenge.md) |

#### Defined in

[crypto/por/index.ts:21](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L21)

___

### createRelayerKey

▸ **createRelayerKey**(`destination`): `Promise`<`CID`\>

Creates a DHT entry to give relays the opportunity to signal
other nodes in the network that they act as a relay for the given
node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `PeerId` | peerId of the node for which relay services are provided |

#### Returns

`Promise`<`CID`\>

the DHT entry key

#### Defined in

[libp2p/relayCode.ts:13](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/relayCode.ts#L13)

___

### debug

▸ `Const` **debug**(`namespace`): (`message`: `any`, ...`parameters`: `any`[]) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `any` |

#### Returns

`fn`

▸ (`message`, ...`parameters`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `...parameters` | `any`[] |

##### Returns

`void`

#### Defined in

[process/debug.ts:14](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/process/debug.ts#L14)

___

### decodePoRBytes

▸ **decodePoRBytes**(`porBytes`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `porBytes` | `Uint8Array` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ackChallenge` | [`HalfKeyChallenge`](classes/HalfKeyChallenge.md) |
| `nextTicketChallenge` | [`Challenge`](classes/Challenge.md) |

#### Defined in

[crypto/por/index.ts:112](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L112)

___

### defer

▸ **defer**<`T`\>(): [`DeferType`](modules.md#defertype)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`DeferType`](modules.md#defertype)<`T`\>

#### Defined in

[async/defer.ts:8](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/defer.ts#L8)

___

### deriveAckKeyShare

▸ **deriveAckKeyShare**(`secret`): [`HalfKey`](classes/HalfKey.md)

Computes the key share that is embedded in the acknowledgement
for a packet and thereby unlocks the incentive for the previous
relayer for transforming and delivering the packet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `Uint8Array` | shared secret with the creator of the packet |

#### Returns

[`HalfKey`](classes/HalfKey.md)

#### Defined in

[crypto/por/keyDerivation.ts:31](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/por/keyDerivation.ts#L31)

___

### deriveCommitmentSeed

▸ **deriveCommitmentSeed**(`privateKey`, `channelInfo`): `Uint8Array`

Derives the initial commitment seed on a newly opened channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `Uint8Array` | Node private key. |
| `channelInfo` | `Uint8Array` | Additional information identifying the channel. |

#### Returns

`Uint8Array`

#### Defined in

[crypto/commitment/keyDerivation.ts:12](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/commitment/keyDerivation.ts#L12)

___

### deserializeKeyPair

▸ **deserializeKeyPair**(`serialized`, `password`, `useWeakCrypto?`): `Promise`<`DeserializationResponse`\>

Deserializes an encoded key pair

**`dev`** This method uses a computation and memory intensive hash function,
     for testing set `useWeakCrypto = true`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `serialized` | `Uint8Array` | `undefined` | encoded key pair |
| `password` | `string` | `undefined` | password to use for decryption |
| `useWeakCrypto` | `boolean` | `false` | use faster but weaker crypto to reconstruct key pair |

#### Returns

`Promise`<`DeserializationResponse`\>

reconstructed key pair

#### Defined in

[crypto/keyPair.ts:84](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/keyPair.ts#L84)

___

### dial

▸ **dial**(`libp2p`, `destination`, `protocol`, `opts?`): `Promise`<[`DialResponse`](modules.md#dialresponse)\>

Performs a dial strategy using libp2p.dialProtocol and libp2p.findPeer
to establish a connection.
Contains a baseline protection against dialing same addresses twice.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `libp2p` | `ReducedLibp2p` | a libp2p instance |
| `destination` | `PeerId` | PeerId of the destination |
| `protocol` | `string` | - |
| `opts?` | [`TimeoutOpts`](modules.md#timeoutopts) |  |

#### Returns

`Promise`<[`DialResponse`](modules.md#dialresponse)\>

#### Defined in

[libp2p/dialHelper.ts:273](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/dialHelper.ts#L273)

___

### expandVars

▸ **expandVars**(`input`, `vars`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | a string containing templated references to environment variables e.g. 'foo ${bar}' |
| `vars` | `Object` | a key-value vars storage object, e.g. { 'bar': 'bar_value' } |

#### Returns

`string`

a string with variables resolved to the actual values

#### Defined in

[utils.ts:19](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/utils.ts#L19)

___

### forwardTransform

▸ **forwardTransform**(`privKey`, `packet`, `additionalDataRelayerLength`, `additionalDataLastHopLength`, `maxHops`): `LastNodeOutput` \| `RelayNodeOutput`

Applies the transformation to the header to forward
it to the next node or deliver it to the user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privKey` | `PeerId` | private key of the relayer |
| `packet` | `Uint8Array` | incoming packet as u8a |
| `additionalDataRelayerLength` | `number` | length of the additional data next the routing information of each hop |
| `additionalDataLastHopLength` | `number` | lenght of the additional data for the last hop |
| `maxHops` | `number` | maximal amount of hops |

#### Returns

`LastNodeOutput` \| `RelayNodeOutput`

whether the packet is valid, if yes returns
the transformed packet, the public key of the next hop
and the data next to the routing information. If current
hop is the final recipient, it returns the plaintext

#### Defined in

[crypto/packet/index.ts:128](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/packet/index.ts#L128)

___

### gcd

▸ **gcd**(`a`, `b`): `number`

Computes the greatest common divisor of two integers

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `number` | first number |
| `b` | `number` | second number |

#### Returns

`number`

#### Defined in

[math/gcd.ts:6](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/math/gcd.ts#L6)

___

### generateChannelId

▸ **generateChannelId**(`source`, `destination`): [`Hash`](classes/Hash.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Address`](classes/Address.md) |
| `destination` | [`Address`](classes/Address.md) |

#### Returns

[`Hash`](classes/Hash.md)

#### Defined in

[types/channelEntry.ts:14](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/types/channelEntry.ts#L14)

___

### generateKeyShares

▸ **generateKeyShares**(`path`): `Object`

Performs an offline Diffie-Hellman key exchange with
the nodes along the given path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PeerId`[] | the path to use for the mixnet packet |

#### Returns

`Object`

the first group element and the shared secrets
with the nodes along the path

| Name | Type |
| :------ | :------ |
| `alpha` | `Uint8Array` |
| `secrets` | `Uint8Array`[] |

#### Defined in

[crypto/packet/keyShares.ts:16](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/packet/keyShares.ts#L16)

___

### getB58String

▸ **getB58String**(`content`): `string`

Returns the b58String within a given content. Returns empty string if none is found.

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |

#### Returns

`string`

#### Defined in

[libp2p/index.ts:70](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L70)

___

### getHeaderLength

▸ **getHeaderLength**(`maxHops`, `additionalDataRelayerLength`, `additionalDataLastHopLength`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxHops` | `number` |
| `additionalDataRelayerLength` | `number` |
| `additionalDataLastHopLength` | `number` |

#### Returns

`number`

#### Defined in

[crypto/packet/index.ts:28](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/packet/index.ts#L28)

___

### getIpv4LocalAddressClass

▸ **getIpv4LocalAddressClass**(`address`): ``"A"`` \| ``"B"`` \| ``"C"`` \| ``"D"`` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `Multiaddr` |

#### Returns

``"A"`` \| ``"B"`` \| ``"C"`` \| ``"D"`` \| `undefined`

#### Defined in

[libp2p/addressSorters.ts:34](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/addressSorters.ts#L34)

___

### getLocalAddresses

▸ **getLocalAddresses**(`_iface?`): [`Network`](modules.md#network)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `_iface?` | `string` |

#### Returns

[`Network`](modules.md#network)[]

#### Defined in

[network/addrs.ts:258](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L258)

___

### getLocalHosts

▸ **getLocalHosts**(`_iface?`): [`Network`](modules.md#network)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `_iface?` | `string` |

#### Returns

[`Network`](modules.md#network)[]

#### Defined in

[network/addrs.ts:269](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L269)

___

### getNetworkPrefix

▸ **getNetworkPrefix**(`address`, `subnet`, `family`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `Uint8Array` |
| `subnet` | `Uint8Array` |
| `family` | ``"IPv4"`` \| ``"IPv6"`` |

#### Returns

`Uint8Array`

#### Defined in

[network/addrs.ts:183](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L183)

___

### getPacketLength

▸ **getPacketLength**(`maxHops`, `additionalDataRelayerLength`, `additionalDataLastHopLength`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxHops` | `number` |
| `additionalDataRelayerLength` | `number` |
| `additionalDataLastHopLength` | `number` |

#### Returns

`number`

#### Defined in

[crypto/packet/index.ts:39](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/packet/index.ts#L39)

___

### getPrivateAddresses

▸ **getPrivateAddresses**(`_iface?`): [`Network`](modules.md#network)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `_iface?` | `string` |

#### Returns

[`Network`](modules.md#network)[]

#### Defined in

[network/addrs.ts:255](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L255)

___

### getPublicAddresses

▸ **getPublicAddresses**(`_iface?`): [`Network`](modules.md#network)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `_iface?` | `string` |

#### Returns

[`Network`](modules.md#network)[]

#### Defined in

[network/addrs.ts:262](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L262)

___

### hasB58String

▸ **hasB58String**(`content`): `Boolean`

Returns true or false if given string does not contain a b58string

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |

#### Returns

`Boolean`

#### Defined in

[libp2p/index.ts:53](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L53)

___

### inSameNetwork

▸ **inSameNetwork**(`address`, `networkPrefix`, `subnetMask`, `family`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `Uint8Array` |
| `networkPrefix` | `Uint8Array` |
| `subnetMask` | `Uint8Array` |
| `family` | ``"IPv4"`` \| ``"IPv6"`` |

#### Returns

`boolean`

#### Defined in

[network/addrs.ts:196](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L196)

___

### ipToU8aAddress

▸ **ipToU8aAddress**(`address`, `family`): `Uint8Array`

Converts ip address string to Uint8Arrays

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | ip address as string, e.g. 192.168.12.34 |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`Uint8Array`

Byte representation of the given ip address

#### Defined in

[network/addrs.ts:92](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L92)

___

### isAnyAddress

▸ **isAnyAddress**(`address`, `family`): `boolean`

Checks if given address is any address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

#### Defined in

[network/addrs.ts:11](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L11)

___

### isErrorOutOfFunds

▸ **isErrorOutOfFunds**(`error`): ``"NATIVE"`` \| ``"HOPR"`` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

``"NATIVE"`` \| ``"HOPR"`` \| ``false``

#### Defined in

[ethereum/index.ts:17](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/ethereum/index.ts#L17)

___

### isErrorOutOfHoprFunds

▸ **isErrorOutOfHoprFunds**(`error`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

`boolean`

#### Defined in

[ethereum/index.ts:11](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/ethereum/index.ts#L11)

___

### isErrorOutOfNativeFunds

▸ **isErrorOutOfNativeFunds**(`error`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

`boolean`

#### Defined in

[ethereum/index.ts:6](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/ethereum/index.ts#L6)

___

### isExpired

▸ **isExpired**(`value`, `now`, `ttl`): `boolean`

Compares timestamps to find out if "value" has expired.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | timestamp to compare with |
| `now` | `number` | timestamp example: `new Date().getTime()` |
| `ttl` | `number` | in milliseconds |

#### Returns

`boolean`

true if it's expired

#### Defined in

[time.ts:23](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/time.ts#L23)

___

### isLinkLocaleAddress

▸ **isLinkLocaleAddress**(`address`, `family`): `boolean`

Checks if given address is link-locale address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if is link-locale address

#### Defined in

[network/addrs.ts:48](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L48)

___

### isLocalhost

▸ **isLocalhost**(`address`, `family`): `boolean`

Checks if given address is a loopback address (localhost)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if localhost

#### Defined in

[network/addrs.ts:28](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L28)

___

### isMultiaddrLocal

▸ **isMultiaddrLocal**(`multiaddr`): `boolean`

Checks if given Multiaddr encodes a private address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multiaddr` | `Multiaddr` | multiaddr to check |

#### Returns

`boolean`

true if address is a private ip address

#### Defined in

[libp2p/addressSorters.ts:11](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/addressSorters.ts#L11)

___

### isPrivateAddress

▸ **isPrivateAddress**(`address`, `family`): `boolean`

Checks if given address is a private address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if private address

#### Defined in

[network/addrs.ts:38](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L38)

___

### isReservedAddress

▸ **isReservedAddress**(`address`, `family`): `boolean`

Checks if given address is a reserved address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if address is a reserved address

#### Defined in

[network/addrs.ts:58](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L58)

___

### isSecp256k1PeerId

▸ **isSecp256k1PeerId**(`peer`): `boolean`

Check if PeerId contains a secp256k1 privKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peer` | `PeerId` | PeerId to check |

#### Returns

`boolean`

whether embedded privKey is a secp256k1 key

#### Defined in

[libp2p/index.ts:86](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L86)

___

### iterateHash

▸ **iterateHash**(`seed`, `hashFunc`, `iterations`, `stepSize`, `hint?`): `Promise`<{ `hash`: `Uint8Array` ; `intermediates`: [`Intermediate`](interfaces/Intermediate.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `Uint8Array` |
| `hashFunc` | (`preImage`: `Uint8Array`) => `Uint8Array` |
| `iterations` | `number` |
| `stepSize` | `number` |
| `hint?` | (`index`: `number`) => `Uint8Array` \| `Promise`<`Uint8Array`\> |

#### Returns

`Promise`<{ `hash`: `Uint8Array` ; `intermediates`: [`Intermediate`](interfaces/Intermediate.md)[]  }\>

#### Defined in

[crypto/hashIterator.ts:7](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/hashIterator.ts#L7)

___

### lengthPrefixedToU8a

▸ **lengthPrefixedToU8a**(`arg`, `additionalPadding?`, `targetLength?`): `Uint8Array`

Decodes a length-prefixed array and returns the encoded data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Uint8Array` | array to decode |
| `additionalPadding?` | `Uint8Array` | additional padding to remove |
| `targetLength?` | `number` | optional target length |

#### Returns

`Uint8Array`

#### Defined in

[u8a/lengthPrefixedToU8a.ts:11](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/lengthPrefixedToU8a.ts#L11)

___

### libp2pSendMessage

▸ **libp2pSendMessage**(`libp2p`, `destination`, `protocol`, `message`, `includeReply`, `opts?`): `Promise`<`void` \| `Uint8Array`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `libp2p` | `Libp2p` |
| `destination` | `PeerId` |
| `protocol` | `string` |
| `message` | `Uint8Array` |
| `includeReply` | `boolean` |
| `opts?` | [`TimeoutOpts`](modules.md#timeoutopts) |

#### Returns

`Promise`<`void` \| `Uint8Array`[]\>

#### Defined in

[libp2p/index.ts:122](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L122)

___

### libp2pSubscribe

▸ **libp2pSubscribe**(`libp2p`, `protocol`, `handler`, `errHandler`, `includeReply?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `libp2p` | `Libp2p` | `undefined` |
| `protocol` | `string` | `undefined` |
| `handler` | [`LibP2PHandlerFunction`](modules.md#libp2phandlerfunction)<`void` \| `Promise`<`void` \| `Uint8Array`\>\> | `undefined` |
| `errHandler` | `ErrHandler` | `undefined` |
| `includeReply` | `boolean` | `false` |

#### Returns

`void`

#### Defined in

[libp2p/index.ts:252](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L252)

___

### loadJson

▸ **loadJson**(`file_path`): `any`

loads JSON data from file

**`throws`** if unable to open the file the JSON data is malformed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file_path` | `string` | json file to load |

#### Returns

`any`

object parsed from JSON data

#### Defined in

[utils.ts:34](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/utils.ts#L34)

___

### localAddressesFirst

▸ **localAddressesFirst**(`addresses`): `Address`[]

Take an array of addresses and sorts such that private addresses are first

**`dev`** used to run Hopr locally

#### Parameters

| Name | Type |
| :------ | :------ |
| `addresses` | `Address`[] |

#### Returns

`Address`[]

#### Defined in

[libp2p/addressSorters.ts:94](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/addressSorters.ts#L94)

___

### moveDecimalPoint

▸ **moveDecimalPoint**(`amount`, `position`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `string` \| `number` \| `BigNumber` |
| `position` | `number` |

#### Returns

`string`

#### Defined in

[math/moveDecimalPoint.ts:3](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/math/moveDecimalPoint.ts#L3)

___

### multiaddressCompareByClassFunction

▸ **multiaddressCompareByClassFunction**(`a`, `b`): `number`

Compare two multiaddresses based on their class: A class first, B class second, ...
Local addresses take precedence over remote addresses.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `Multiaddr` |
| `b` | `Multiaddr` |

#### Returns

`number`

#### Defined in

[libp2p/addressSorters.ts:54](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/addressSorters.ts#L54)

___

### nAtATime

▸ **nAtATime**<`ArgType`, `Return`, `Args`\>(`fn`, `args`, `concurrency`): `Promise`<(`Return` \| `Error`)[]\>

Runs the same worker function with multiple arguments but does not run more
than a given number of workers concurrently.

**`dev`** Iterative implementation of the functionality

**`example`**
import { setTimeout } from 'timers/promises'

const result = await nAtaTime(setTimeout, [[300, 'one'], [200, 'two'], [100, 'three']], 2)
// => ['two', 'one', 'three']

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ArgType` | `ArgType` |
| `Return` | `Return` |
| `Args` | extends `ArgType`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (...`args`: `Args`) => `Promise`<`Return`\> | worker function |
| `args` | `Args`[] | arguments passed to worker function |
| `concurrency` | `number` | number of parallel jobs |

#### Returns

`Promise`<(`Return` \| `Error`)[]\>

an array containing the results

#### Defined in

[async/parallel.ts:43](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/parallel.ts#L43)

___

### oneAtATime

▸ **oneAtATime**<`ReturnType`\>(): (`fn`: () => `Promise`<`ReturnType`\>) => `void`

Creates a limiter that takes functions and runs them subsequently
with no concurrency.

**`example`**
let limiter = oneAtATime()
limiter(() => Promise.resolve('1'))
limiter(() => Promise.resolve('2'))

#### Type parameters

| Name |
| :------ |
| `ReturnType` |

#### Returns

`fn`

a limiter that takes additional functions

▸ (`fn`): `void`

Creates a limiter that takes functions and runs them subsequently
with no concurrency.

**`example`**
let limiter = oneAtATime()
limiter(() => Promise.resolve('1'))
limiter(() => Promise.resolve('2'))

##### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `Promise`<`ReturnType`\> |

##### Returns

`void`

a limiter that takes additional functions

#### Defined in

[async/concurrency.ts:14](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/concurrency.ts#L14)

___

### ordered

▸ **ordered**<`T`\>(): `Object`

Creates a queue that consumes items asynchronously and potentially
unorders but outputs them ordered using an asynchronous iterator.
Each element consists of a value and an index upon which
elements are ordered.

**`example`**
import { ordered, wait } from '@hoprnet/hopr-utils'

const order = ordered<number>()

(async function () {
  order.push({ index: 0, value: 'first' })
  wait(50)
  order.push({ index: 2, value: 'second' })
  wait(50)
  order.push({ index: 1, value: 'third' })
  wait(50)
  order.end()
})()

const result: string[] = []
for await (const item of order.iterator()) {
  result.push(item.value)
}
// result == ['first', 'third', 'second']

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`Object`

an ordered stream

| Name | Type |
| :------ | :------ |
| `end` | () => `void` |
| `iterator` | () => `AsyncGenerator`<`Item`<`T`\>, `void`, `unknown`\> |
| `push` | (`newItem`: `Item`<`T`\>) => `void` |

#### Defined in

[async/ordering.ts:35](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/ordering.ts#L35)

___

### parseHosts

▸ **parseHosts**(): [`Hosts`](modules.md#hosts)

#### Returns

[`Hosts`](modules.md#hosts)

#### Defined in

[network/hosts.ts:11](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/hosts.ts#L11)

___

### parseJSON

▸ **parseJSON**(`str`): `object`

Parse JSON while recovering all Buffer elements

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | JSON string |

#### Returns

`object`

#### Defined in

[parseJSON.ts:5](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/parseJSON.ts#L5)

___

### pendingAcknowledgement

▸ `Const` **pendingAcknowledgement**(`halfKey`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `halfKey` | [`HalfKeyChallenge`](classes/HalfKeyChallenge.md) |

#### Returns

`Uint8Array`

#### Defined in

[db.ts:32](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/db.ts#L32)

___

### pickVersion

▸ `Const` **pickVersion**(`full_version`): `string`

Used by our network stack and deployment scripts to determine.

#### Parameters

| Name | Type |
| :------ | :------ |
| `full_version` | `string` |

#### Returns

`string`

major and minor versions, ex: `1.8.5` -> `1.8.0`

#### Defined in

[libp2p/pickVersion.ts:6](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/pickVersion.ts#L6)

___

### preVerify

▸ **preVerify**(`secret`, `porBytes`, `challenge`): `ValidOutput` \| `InvalidOutput`

Verifies that an incoming packet contains all values that
are necessary to reconstruct the response to redeem the
incentive for relaying the packet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `Uint8Array` | shared secret with the creator of the packet |
| `porBytes` | `Uint8Array` | PoR bitstring as included within the packet |
| `challenge` | [`EthereumChallenge`](classes/EthereumChallenge.md) | ticket challenge of the incoming ticket |

#### Returns

`ValidOutput` \| `InvalidOutput`

whether the challenge is derivable, if yes, it returns
the keyShare of the relayer as well as the secret that is used
to create it and the challenge for the next relayer.

#### Defined in

[crypto/por/index.ts:83](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L83)

___

### prefixLength

▸ **prefixLength**(`prefix`): `number`

Returns the prefix length of a network prefix

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `Uint8Array` | network prefix, e.g. `new Uint8Array([255,255,255,0])` |

#### Returns

`number`

the prefix length, e.g. 24

#### Defined in

[network/addrs.ts:131](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L131)

___

### privKeyToPeerId

▸ **privKeyToPeerId**(`privKey`): `PeerId`

Converts a plain compressed ECDSA private key over the curve `secp256k1`
to a peerId in order to use it with libp2p.
It equips the generated peerId with private key and public key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privKey` | `string` \| `Uint8Array` | the plain private key |

#### Returns

`PeerId`

#### Defined in

[libp2p/privKeyToPeerId.ts:18](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/privKeyToPeerId.ts#L18)

___

### pubKeyToPeerId

▸ **pubKeyToPeerId**(`pubKey`): `PeerId`

Converts a plain compressed ECDSA public key over the curve `secp256k1`
to a peerId in order to use it with libp2p.

**`notice`** Libp2p stores the keys in format that is derived from `protobuf`.
Using `libsecp256k1` directly does not work.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pubKey` | `string` \| `Uint8Array` | the plain public key |

#### Returns

`PeerId`

#### Defined in

[libp2p/pubKeyToPeerId.ts:17](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/pubKeyToPeerId.ts#L17)

___

### randomBigInteger

▸ **randomBigInteger**(`start`, `end?`): `bigint`

same as randomInteger, but for BigInts

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `bigint` |
| `end?` | `bigint` |

#### Returns

`bigint`

#### Defined in

[crypto/randomInteger.ts:181](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L181)

___

### randomChoice

▸ **randomChoice**<`T`\>(`collection`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collection` | `T`[] |

#### Returns

`T`

#### Defined in

[crypto/randomInteger.ts:194](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L194)

___

### randomFloat

▸ **randomFloat**(): `number`

#### Returns

`number`

#### Defined in

[crypto/randomFloat.ts:3](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/randomFloat.ts#L3)

___

### randomInteger

▸ **randomInteger**(`start`, `end?`): `number`

Returns a random value between `start` and `end`.

**`example`**
```
randomInteger(3) // result in { 0, 1, 2}
randomInteger(0, 3) // result in { 0, 1, 2 }
randomInteger(7, 9) // result in { 7, 8 }
```
The maximum number generated by this function is MAX_RANDOM_INTEGER.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | start of the interval (inclusive). Must be non-negative. |
| `end?` | `number` | end of the interval (not inclusive). Must not exceed MAX_RANDOM_INTEGER. |

#### Returns

`number`

random number between @param start and @param end

#### Defined in

[crypto/randomInteger.ts:159](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L159)

___

### randomPermutation

▸ **randomPermutation**<`T`\>(`array`): `T`[]

Return a random permutation of the given `array`
by using the (optimized) Fisher-Yates shuffling algorithm.

**`example`**

```javascript
randomPermutation([1,2,3,4]);
// first run: [2,4,1,2]
// second run: [3,1,2,4]
// ...
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `T`[] | the array to permutate |

#### Returns

`T`[]

#### Defined in

[collection/randomPermutation.ts:18](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/collection/randomPermutation.ts#L18)

___

### randomSubset

▸ **randomSubset**<`T`\>(`array`, `subsetSize`, `filter?`): `T`[]

Picks @param subsetSize elements at random from @param array .
The order of the picked elements does not coincide with their
order in @param array

**`notice`** If less than @param subsetSize elements pass the test,
the result will contain less than @param subsetSize elements.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `T`[] | the array to pick the elements from |
| `subsetSize` | `number` | the requested size of the subset |
| `filter?` | (`candidate`: `T`) => `boolean` | called with `(peerInfo)` and should return `true` for every node that should be in the subset |

#### Returns

`T`[]

array with at most @param subsetSize elements
that pass the test.

#### Defined in

[collection/randomSubset.ts:20](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/collection/randomSubset.ts#L20)

___

### recoverIteratedHash

▸ **recoverIteratedHash**(`hashValue`, `hashFunc`, `hint`, `maxIterations`, `stepSize?`, `indexHint?`): `Promise`<[`Intermediate`](interfaces/Intermediate.md) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hashValue` | `Uint8Array` |
| `hashFunc` | (`preImage`: `Uint8Array`) => `Uint8Array` |
| `hint` | (`index`: `number`) => `Promise`<`Uint8Array`\> |
| `maxIterations` | `number` |
| `stepSize?` | `number` |
| `indexHint?` | `number` |

#### Returns

`Promise`<[`Intermediate`](interfaces/Intermediate.md) \| `undefined`\>

#### Defined in

[crypto/hashIterator.ts:55](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/hashIterator.ts#L55)

___

### retimer

▸ **retimer**(`fn`, `newTimeout`): () => `void`

Repeatedly apply a function after a timeout

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `void` | function to apply after every timeout |
| `newTimeout` | () => `number` | function that returns the new timeout |

#### Returns

`fn`

▸ (): `void`

Repeatedly apply a function after a timeout

##### Returns

`void`

#### Defined in

[process/retimer.ts:6](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/process/retimer.ts#L6)

___

### retryWithBackoff

▸ **retryWithBackoff**<`T`\>(`fn`, `options?`): `Promise`<`T`\>

A general use backoff that will reject once MAX_DELAY is reached.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `Promise`<`T`\> | asynchronous function to run on every tick |
| `options` | `Object` | - |
| `options.delayMultiple?` | `number` | multiplier to apply to increase running delay |
| `options.maxDelay?` | `number` | maximum delay, we reject once we reach this |
| `options.minDelay?` | `number` | minimum delay, we start with this |

#### Returns

`Promise`<`T`\>

#### Defined in

[async/backoff.ts:18](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/backoff.ts#L18)

___

### sampleGroupElement

▸ **sampleGroupElement**(`compressed?`): [exponent: Uint8Array, groupElement: Uint8Array]

Samples a valid exponent and returns the exponent
and the product of exponent and base-point.

**`dev`** can be used to derive a secp256k1 keypair

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `compressed` | `boolean` | `false` |

#### Returns

[exponent: Uint8Array, groupElement: Uint8Array]

#### Defined in

[crypto/sampleGroupElement.ts:11](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/sampleGroupElement.ts#L11)

___

### serializeKeyPair

▸ **serializeKeyPair**(`peerId`, `password`, `useWeakCrypto?`, `__iv?`, `__salt?`, `__uuidSalt?`): `Promise`<`Uint8Array`\>

Serializes a peerId using geth's KeyStore format
see https://medium.com/@julien.maffre/what-is-an-ethereum-keystore-file-86c8c5917b97

**`dev`** This method uses a computation and memory intensive hash function,
     for testing set `useWeakCrypto = true`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `peerId` | `PeerId` | `undefined` | id to store |
| `password` | `string` | `undefined` | password used for encryption |
| `useWeakCrypto` | `boolean` | `false` | weak parameter for fast serialization |
| `__iv?` | `string` | `undefined` | - |
| `__salt?` | `string` | `undefined` | - |
| `__uuidSalt?` | `string` | `undefined` | - |

#### Returns

`Promise`<`Uint8Array`\>

Uint8Array representation

#### Defined in

[crypto/keyPair.ts:18](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/keyPair.ts#L18)

___

### serializeToU8a

▸ **serializeToU8a**(`items`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | [`U8aAndSize`](modules.md#u8aandsize)[] |

#### Returns

`Uint8Array`

#### Defined in

[u8a/index.ts:22](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/index.ts#L22)

___

### startResourceUsageLogger

▸ **startResourceUsageLogger**(`log`, `ms?`): () => `void`

Creates a resource logger and provides a function to stop it.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `log` | `LogType` | `undefined` | logs resource stat strings |
| `ms` | `number` | `60_000` | interval to redo the measurement |

#### Returns

`fn`

a function that stop the resource logger

▸ (): `void`

Creates a resource logger and provides a function to stop it.

##### Returns

`void`

a function that stop the resource logger

#### Defined in

[process/resourceLogger.ts:26](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/process/resourceLogger.ts#L26)

___

### stringToU8a

▸ **stringToU8a**(`str`, `length?`): `Uint8Array`

Converts a **HEX** string to a Uint8Array and optionally adds some padding to match
the desired size.

**`example`**
stringToU8a('0xDEadBeeF') // Uint8Array [ 222, 173, 190, 239 ]

**`notice`** Throws an error in case a length was provided and the result does not fit.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | string to convert |
| `length?` | `number` | desired length of the Uint8Array |

#### Returns

`Uint8Array`

#### Defined in

[u8a/toU8a.ts:60](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/toU8a.ts#L60)

___

### timeoutAfter

▸ **timeoutAfter**<`T`\>(`body`, `timeout`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | (`abortSignal`: `AbortSignal`) => `Promise`<`T`\> |
| `timeout` | `number` |

#### Returns

`Promise`<`T`\>

#### Defined in

[async/timeout.ts:5](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/timeout.ts#L5)

___

### timer

▸ **timer**(`fn`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `void` |

#### Returns

`number`

#### Defined in

[utils.ts:6](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/utils.ts#L6)

___

### toLengthPrefixedU8a

▸ **toLengthPrefixedU8a**(`arg`, `additionalPadding?`, `length?`): `Uint8Array`

Adds a length-prefix to a Uint8Array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Uint8Array` | data to add padding |
| `additionalPadding?` | `Uint8Array` | optional additional padding that is inserted between length and data |
| `length?` | `number` | optional target length |

#### Returns

`Uint8Array`

#### Defined in

[u8a/toLengthPrefixedU8a.ts:12](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/toLengthPrefixedU8a.ts#L12)

___

### toNetworkPrefix

▸ **toNetworkPrefix**(`addr`): [`Network`](modules.md#network)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addr` | `NetworkInterfaceInfo` |

#### Returns

[`Network`](modules.md#network)

#### Defined in

[network/addrs.ts:229](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L229)

___

### toU8a

▸ **toU8a**(`arg`, `length?`): `Uint8Array`

Converts a number to a Uint8Array and optionally adds some padding to match
the desired size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `number` | to convert to Uint8Array |
| `length?` | `number` | desired length of the Uint8Array |

#### Returns

`Uint8Array`

#### Defined in

[u8a/toU8a.ts:7](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/toU8a.ts#L7)

___

### u8aAdd

▸ **u8aAdd**(`inplace`, `a`, `b`): `Uint8Array`

Adds the contents of two arrays together while ignoring the final overflow.
Computes `a + b % ( 2 ** (8 * a.length) - 1)`

**`example`**
u8aAdd(false, new Uint8Array([1], new Uint8Array([2])) // Uint8Array([3])
u8aAdd(false, new Uint8Array([1], new Uint8Array([255])) // Uint8Array([0])
u8aAdd(false, new Uint8Array([0, 1], new Uint8Array([0, 255])) // Uint8Array([1, 0])

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inplace` | `boolean` | result is stored in a if set to true |
| `a` | `Uint8Array` | first array |
| `b` | `Uint8Array` | second array |

#### Returns

`Uint8Array`

#### Defined in

[u8a/u8aAdd.ts:13](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/u8aAdd.ts#L13)

___

### u8aAddrToString

▸ **u8aAddrToString**(`address`, `family`): `string`

Converts ip address from byte representation to string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip addr given as Uint8Array |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`string`

#### Defined in

[network/addrs.ts:164](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L164)

___

### u8aAddressToCIDR

▸ **u8aAddressToCIDR**(`prefix`, `subnet`, `family`): `string`

Takes a network prefix, a subnet and a IP address family and
returns a CIDR string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `Uint8Array` | network prefix, e.g. `new Uint8Array([10,0,0,0]) |
| `subnet` | `Uint8Array` | subnet, e.g. `new Uint8Array([255,255,255,0]) |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | IP address family, `IPv4` or `IPv6` |

#### Returns

`string`

a CIDR string, such as `192.168.1.0/24`

#### Defined in

[network/addrs.ts:154](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L154)

___

### u8aAllocate

▸ **u8aAllocate**(`{`, ...`list`): `Uint8Array`

Writes to the provided mempage the data on a given list of u8a on a given offset

**`export`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `{` | `MemoryPage` | page: ArrayBuffer, offset: number } |
| `...list` | `Uint8Array`[] |  |

#### Returns

`Uint8Array`

#### Defined in

[u8a/allocate.ts:14](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/allocate.ts#L14)

___

### u8aCompare

▸ **u8aCompare**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `Uint8Array` |
| `b` | `Uint8Array` |

#### Returns

`number`

#### Defined in

[u8a/u8aCompare.ts:5](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/u8aCompare.ts#L5)

___

### u8aConcat

▸ **u8aConcat**(...`list`): `Uint8Array`

Concatenates the input arrays into a single `UInt8Array`.

**`example`**
u8aConcat(
  new Uint8Array([1, 1, 1]),
  new Uint8Array([2, 2, 2])
); // Uint8Arrau([1, 1, 1, 2, 2, 2])
 * u8aConcat(
  new Uint8Array([1, 1, 1]),
  undefined
  new Uint8Array([2, 2, 2])
); // Uint8Arrau([1, 1, 1, 2, 2, 2])

#### Parameters

| Name | Type |
| :------ | :------ |
| `...list` | `Uint8Array`[] |

#### Returns

`Uint8Array`

#### Defined in

[u8a/concat.ts:15](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/concat.ts#L15)

___

### u8aEquals

▸ **u8aEquals**(...`arrays`): `boolean`

Checks if the contents of the given Uint8Arrays are equal. Returns once at least
one different entry is found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...arrays` | `Uint8Array`[] | additional arrays |

#### Returns

`boolean`

#### Defined in

[u8a/equals.ts:8](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/equals.ts#L8)

___

### u8aSplit

▸ **u8aSplit**(`u8a`, `sizes`): `Uint8Array`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `u8a` | `Uint8Array` |
| `sizes` | `number`[] |

#### Returns

`Uint8Array`[]

#### Defined in

[u8a/index.ts:36](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/index.ts#L36)

___

### u8aToHex

▸ **u8aToHex**(`arr?`, `prefixed?`): `string`

Converts a Uint8Array to a hex string.

**`notice`** Mainly used for debugging.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr?` | `Uint8Array` | `undefined` | Uint8Array |
| `prefixed` | `boolean` | `true` | if `true` add a `0x` in the beginning |

#### Returns

`string`

#### Defined in

[u8a/toHex.ts:8](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/toHex.ts#L8)

___

### u8aToNumber

▸ **u8aToNumber**(`arr`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `Uint8Array` |

#### Returns

`number`

#### Defined in

[u8a/u8aToNumber.ts:41](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/u8aToNumber.ts#L41)

___

### u8aToNumberOrBigInt

▸ **u8aToNumberOrBigInt**(`arr`): `number` \| `bigint`

Converts a Uint8Array to number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `Uint8Array` | Uint8Array to convert to number |

#### Returns

`number` \| `bigint`

#### Defined in

[u8a/u8aToNumber.ts:5](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/u8aToNumber.ts#L5)

___

### u8aXOR

▸ **u8aXOR**(`inPlace?`, ...`list`): `Uint8Array`

Apply an XOR on a list of arrays.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `inPlace` | `boolean` | `false` | if `true` overwrite first Array with result |
| `...list` | `Uint8Array`[] | `undefined` | arrays to XOR |

#### Returns

`Uint8Array`

#### Defined in

[u8a/xor.ts:7](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/u8a/xor.ts#L7)

___

### validateData

▸ **validateData**(`data`, `schema`): `void`

validates JSON data against JSON schema
prints errors to the console and throws in case of non-conforming

**`throws`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | parsed JSON data |
| `schema` | `any` | parsed JSON schema for the data |

#### Returns

`void`

#### Defined in

[utils.ts:46](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/utils.ts#L46)

___

### validatePoRHalfKeys

▸ **validatePoRHalfKeys**(`ethereumChallenge`, `ownKey`, `ack`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethereumChallenge` | [`EthereumChallenge`](classes/EthereumChallenge.md) |
| `ownKey` | [`HalfKey`](classes/HalfKey.md) |
| `ack` | [`HalfKey`](classes/HalfKey.md) |

#### Returns

`boolean`

#### Defined in

[crypto/por/index.ts:128](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L128)

___

### validatePoRHint

▸ **validatePoRHint**(`ethereumChallenge`, `ownShare`, `ack`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethereumChallenge` | [`EthereumChallenge`](classes/EthereumChallenge.md) |
| `ownShare` | [`HalfKeyChallenge`](classes/HalfKeyChallenge.md) |
| `ack` | [`HalfKey`](classes/HalfKey.md) |

#### Returns

`boolean`

#### Defined in

[crypto/por/index.ts:139](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L139)

___

### validatePoRResponse

▸ **validatePoRResponse**(`ethereumChallenge`, `response`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethereumChallenge` | [`EthereumChallenge`](classes/EthereumChallenge.md) |
| `response` | [`Response`](classes/Response.md) |

#### Returns

`boolean`

#### Defined in

[crypto/por/index.ts:133](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L133)

___

### verifySignatureFromPeerId

▸ **verifySignatureFromPeerId**(`peerId`, `message`, `signature`): `Promise`<`boolean`\>

Verifies a given signature comes from a specific PeerId, based on the
signature generated and the PeerId id.

**`notice`** Currently we assume that the peerId was generated with a sec256k1
key, but no other tests had been done for additional keys (e.g. Curve25519)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peerId` | `string` | the base58String representation of the PeerId |
| `message` | `string` | the message signed by the given PeerId |
| `signature` | `string` | the generated signature created by the PeerId |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[libp2p/verifySignatureFromPeerId.ts:15](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/libp2p/verifySignatureFromPeerId.ts#L15)

___

### wait

▸ **wait**(`milliseconds`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `milliseconds` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[async/backoff.ts:7](https://github.com/szczebel1995/hoprnet/blob/master/packages/utils/src/async/backoff.ts#L7)
