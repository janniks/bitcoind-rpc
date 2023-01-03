import "cross-fetch/polyfill";
import { base64 } from "@scure/base";

import { RpcCallSpec } from "./callspec";

interface RpcOptions {
  host: string;
  port: number;
  user: string;
  pass: string;
  protocol: string;
  /** @deprecated not implemented yet */
  rejectUnauthorized: never;
  /** @deprecated not implemented yet */
  disableAgent: never;
  /** @deprecated not implemented yet */
  httpOptions: never;
}

export default class RpcClient {
  public hostname: string;
  private port: number;
  private protocol: string;
  private auth: string;

  constructor(opts: Partial<RpcOptions>);
  constructor(opts: string);
  constructor(opts: string | Partial<RpcOptions>) {
    if (typeof opts === "string") {
      opts = decodeUrl(opts);
    }

    const defaultOptions = {
      host: "127.0.0.1",
      port: 8332,
      user: "devnet",
      pass: "devnet",
      protocol: "http",
    } as RpcOptions;
    const options = Object.assign(defaultOptions, opts || {});

    this.hostname = options.host;
    this.port = options.port;
    this.protocol = options.protocol;

    this.auth = base64.encode(
      new TextEncoder().encode(`${options.user}:${options.pass}`)
    );

    // this.batchedCalls = null;
    // this.disableAgent = opts.disableAgent || false;

    // var isRejectUnauthorized = typeof opts.rejectUnauthorized !== "undefined";
    // this.rejectUnauthorized = isRejectUnauthorized
    //   ? opts.rejectUnauthorized
    //   : true;

    // if (RpcClient.config.log) {
    //   this.log = RpcClient.config.log;
    // } else {
    //   this.log = RpcClient.loggers[RpcClient.config.logger || "normal"];
    // }
  }

  get CallSpec() {
    return new Proxy(this, {
      get(target, property, receiver) {
        if (property in target) return Reflect.get(target, property, receiver);

        return async function (...params: JSON[]) {
          return await target.call({
            method: property.toString().toLowerCase(),
            params,
            id: getRandomId(),
          });
        };
      },
    }) as any as RpcClient & RpcCallSpec;
  }

  async call(body: Object) {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Basic ${this.auth}`,
        "Content-Type": "application/json",
      },

      // rejectUnauthorized: rpcClient.rejectUnauthorized,
      // agent: rpcClient.disableAgent ? false : undefined,
      body: JSON.stringify(body),
    };

    // if (rpcClient.httpOptions) {
    //   for (var k in rpcClient.httpOptions) {
    //     options[k] = rpcClient.httpOptions[k];
    //   }
    // }

    const errorPrefix = "Bitcoin JSON-RPC: ";

    const res = await fetch(
      `${this.protocol}//${this.hostname}:${this.port}`,
      options
    );

    console.log(res);

    if (res.status === 401) {
      throw new Error(errorPrefix + "Connection Rejected: 401 Unnauthorized");
    }
    if (res.status === 403) {
      throw new Error(errorPrefix + "Connection Rejected: 403 Forbidden");
    }
    if (res.status === 500) {
      const text = await res.text();
      if (text === "Work queue depth exceeded") {
        const exceededError = new Error("Bitcoin JSON-RPC: " + text);
        (exceededError as any).code = 429; // Too many requests
        throw exceededError;
      }
    }

    try {
      if (!res.ok) throw new Error(errorPrefix + "Error: " + res.statusText);
      return await res.json();
    } catch (err) {
      throw new Error(errorPrefix + "Error Parsing JSON", { cause: err });
    }
  }
}

// const cl = console.log.bind(console);
// const noop = function () {};

// RpcClient.loggers = {
//   none: { info: noop, warn: noop, err: noop, debug: noop },
//   normal: { info: cl, warn: cl, err: cl, debug: noop },
//   debug: { info: cl, warn: cl, err: cl, debug: cl },
// };

// RpcClient.config = {
//   logger: "normal", // none, normal, debug
// };

// RpcClient.prototype.batch = function (batchCallback, resultCallback) {
//   this.batchedCalls = [];
//   batchCallback();
//   this.call(this, this.batchedCalls, resultCallback);
//   this.batchedCalls = null;
// };

// HELPERS

function decodeUrl(url: string): Partial<RpcOptions> {
  const parsedUrl = new URL(url);
  return {
    host: parsedUrl.hostname,
    port: parseInt(parsedUrl.port, 10),
    protocol: parsedUrl.protocol,
    user: parsedUrl.username,
    pass: parsedUrl.password,
  };
}

function getRandomId() {
  return parseInt((Math.random() * 100000) as any as string);
}

// // USAGE
// (async () => {
//   const rpc = new RpcClient("http://devnet:devnet@localhost:8332").CallSpec;
//   console.log(await rpc.listunspent());
// })();
