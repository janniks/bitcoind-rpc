# @btc-helpers/rpc

## Installation

```bash
npm install @btc-helpers/rpc
```

## Example

```ts
import RpcClient from "@btc-helpers/rpc";

const rpc = new RpcClient("http://devnet:devnet@localhost:8332").Typed; // .Typed lets TypeScript know about the available RPC endpoints

await rpc.listunspent({
  addresses: ["mqVnk6NPRdhntvfm4hh9vvjiRkFDUuSYsH"],
});
```
