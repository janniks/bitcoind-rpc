import "cross-fetch/polyfill";

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

class RpcClient {
  public hostname: string;
  public port: number;
  public protocol: string;
  public auth: string;

  constructor(opts: Partial<RpcOptions>);
  constructor(opts: string);
  constructor(opts: string | Partial<RpcOptions>) {
    if (typeof opts === "string") {
      opts = decodeUrl(opts);
    }

    const defaultOptions = {
      host: "127.0.0.1",
      port: 8332,
      user: "user",
      pass: "pass",
      protocol: "http",
    } as RpcOptions;
    const options = Object.assign(defaultOptions, opts || {});

    this.hostname = options.host;
    this.port = options.port;
    this.protocol = options.protocol;

    // var userInfo = opts.user + ":" + opts.pass;
    // const buf =
    //   Buffer.from && Buffer.from !== Uint8Array.from
    //     ? Buffer.from(userInfo)
    //     : new Buffer(userInfo);
    // this.auth = buf.toString("base64");
    this.auth = "test"; // todo

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

        return async function (...params: RpcParam[]) {
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
      // headers: "todo",
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

type RpcParam = string | number | boolean | Object;

interface RpcBody {
  jsonrpc?: string | "2.0";
  method: string;
  params: RpcParam[];
  id: number;
}

interface RpcCallSpec {
  /** https://developer.bitcoin.org/reference/rpc/abandontransaction.html */
  abandonTransaction: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/abortrescan.html */
  abortRescan: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/addmultisigaddress.html */
  addMultiSigAddress: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/addnode.html */
  addNode: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/analyzepsbt.html */
  analyzePSBT: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/backupwallet.html */
  backupWallet: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/bumpfee.html */
  bumpFee: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/clearbanned.html */
  clearBanned: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/combinepsbt.html */
  combinePSBT: (obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/combinerawtransaction.html */
  combineRawTransaction: (obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/converttopsbt.html */
  convertToPSBT: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/createmultisig.html */
  createMultiSig: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/createpsbt.html */
  createPSBT: (obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/createrawtransaction.html */
  createRawTransaction: (obj1: Object, obj2: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/createwallet.html */
  createWallet: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/decodepsbt.html */
  decodePSBT: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/decodescript.html */
  decodeScript: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/decoderawtransaction.html */
  decodeRawTransaction: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/deriveaddresses.html */
  deriveAddresses: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/disconnectnode.html */
  disconnectNode: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/dumpprivkey.html */
  dumpPrivKey: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/dumpwallet.html */
  dumpWallet: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/encryptwallet.html */
  encryptWallet: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/enumeratesigners.html */
  enumerateSigners: () => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/estimatefee.html
   */
  estimateFee: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/estimatesmartfee.html */
  estimateSmartFee: (int: number, str: string) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/estimatepriority.html
   */
  estimatePriority: (int: number) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/generate.html
   */
  generate: (int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/generateblock.html */
  generateBlock: (str: string, obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/generatetoaddress.html */
  generateToAddress: (int: number, str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/generatetodescriptor.html */
  generateToDescriptor: (int: number, str: string) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getaccount.html
   */
  getAccount: () => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getaccountaddress.html
   */
  getAccountAddress: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getaddednodeinfo.html */
  getAddedNodeInfo: () => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getaddressmempool.html
   */
  getAddressMempool: (obj: Object) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getaddressutxos.html
   */
  getAddressUtxos: (obj: Object) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getaddressbalance.html
   */
  getAddressBalance: (obj: Object) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getaddressdeltas.html
   */
  getAddressDeltas: (obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getaddressesbylabel.html */
  getAddressesByLabel: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getaddressinfo.html */
  getAddressInfo: (str: string) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getaddresstxids.html
   */
  getAddressTxids: (obj: Object) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getaddressesbyaccount.html
   */
  getAddressesByAccount: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getbalance.html */
  getBalance: (str: string, int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getbalances.html */
  getBalances: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getbestblockhash.html */
  getBestBlockHash: () => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getblockdeltas.html
   */
  getBlockDeltas: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getblock.html */
  getBlock: (str: string, int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getblockchaininfo.html */
  getBlockchainInfo: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getblockcount.html */
  getBlockCount: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getblockfilter.html */
  getBlockFilter: (str: string) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getblockhashes.html
   */
  getBlockHashes: (int1: number, int2: number, obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getblockhash.html */
  getBlockHash: (int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getblockheader.html */
  getBlockHeader: (str: string) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getblocknumber.html
   */
  getBlockNumber: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getblockstats.html */
  getBlockStats: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getblocktemplate.html */
  getBlockTemplate: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getconnectioncount.html */
  getConnectionCount: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getchaintips.html */
  getChainTips: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getchaintxstats.html */
  getChainTxStats: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getdescriptorinfo.html */
  getDescriptorInfo: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getdifficulty.html */
  getDifficulty: () => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getgenerate.html
   */
  getGenerate: () => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/gethashespersec.html
   */
  getHashesPerSec: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getindexinfo.html */
  getIndexInfo: () => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getinfo.html
   */
  getInfo: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getmemoryinfo.html */
  getMemoryInfo: () => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getmemorypool.html
   */
  getMemoryPool: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getmempoolancestors.html */
  getMemPoolAncestors: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getmempooldescendants.html */
  getMemPoolDescendants: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getmempoolentry.html */
  getMemPoolEntry: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getmempoolinfo.html */
  getMemPoolInfo: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getmininginfo.html */
  getMiningInfo: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getnettotals.html */
  getNetTotals: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getnetworkhashps.html */
  getNetworkHashPS: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getnetworkinfo.html */
  getNetworkInfo: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getnewaddress.html */
  getNewAddress: (str1: string, str2: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getnodeaddresses.html */
  getNodeAddresses: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getpeerinfo.html */
  getPeerInfo: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getrawchangeaddress.html */
  getRawChangeAddress: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getrawmempool.html */
  getRawMemPool: (bool: boolean) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getrawtransaction.html */
  getRawTransaction: (str: string, int: number) => Promise<any>;
  /**
   * @deprecated
   * https://developer.bitcoin.org/reference/rpc/getreceivedbyaccount.html
   */
  getReceivedByAccount: (str: string, int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getreceivedbyaddress.html */
  getReceivedByAddress: (str: string, int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getreceivedbylabel.html */
  getReceivedByLabel: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getrpcinfo.html */
  getRpcInfo: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getspentinfo.html */
  getSpentInfo: (obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/gettransaction.html */
  getTransaction: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/gettxout.html */
  getTxOut: (str: string, int: number, bool: boolean) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/gettxoutproof.html */
  getTxOutProof: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/gettxoutsetinfo.html */
  getTxOutSetInfo: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getunconfirmedbalance.html */
  getUnconfirmedBalance: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getwalletinfo.html */
  getWalletInfo: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getwork.html */
  getWork: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/getzmqnotifications.html */
  getZmqNotifications: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/finalizepsbt.html */
  finalizePSBT: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/fundrawtransaction.html */
  fundRawTransaction: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/help.html */
  help: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/importaddress.html */
  importAddress: (str1: string, str2: string, bool: boolean) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/importdescriptors.html */
  importDescriptors: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/importmulti.html */
  importMulti: (obj1: Object, obj2: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/importprivkey.html */
  importPrivKey: (str1: string, str2: string, bool: boolean) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/importprunedfunds.html */
  importPrunedFunds: (str1: string, str2: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/importpubkey.html */
  importPubKey: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/importwallet.html */
  importWallet: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/invalidateblock.html */
  invalidateBlock: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/joinpsbts.html */
  joinPSBTs: (obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/keypoolrefill.html */
  keyPoolRefill: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listaccounts.html */
  listAccounts: (int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listaddressgroupings.html */
  listAddressGroupings: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listbanned.html */
  listBanned: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listdescriptors.html */
  listDescriptors: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listlabels.html */
  listLabels: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listlockunspent.html */
  listLockUnspent: (bool: boolean) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listreceivedbyaccount.html */
  listReceivedByAccount: (int: number, bool: boolean) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listreceivedbyaddress.html */
  listReceivedByAddress: (int: number, bool: boolean) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listreceivedbylabel.html */
  listReceivedByLabel: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listsinceblock.html */
  listSinceBlock: (str: string, int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listtransactions.html */
  listTransactions: (str: string, int1: number, int2: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listunspent.html */
  listUnspent: (int1: number, int2: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listwalletdir.html */
  listWalletDir: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/listwallets.html */
  listWallets: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/loadwallet.html */
  loadWallet: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/lockunspent.html */
  lockUnspent: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/logging.html */
  logging: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/move.html */
  move: (
    str1: string,
    str2: string,
    float: number,
    int: number,
    str3: string
  ) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/ping.html */
  ping: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/preciousblock.html */
  preciousBlock: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/prioritisetransaction.html */
  prioritiseTransaction: (
    str: string,
    float: number,
    int: number
  ) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/pruneblockchain.html */
  pruneBlockChain: (int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/psbtbumpfee.html */
  psbtBumpFee: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/removeprunedfunds.html */
  removePrunedFunds: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/rescanblockchain.html */
  reScanBlockChain: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/savemempool.html */
  saveMemPool: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/send.html */
  send: (obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/sethdseed.html */
  setHDSeed: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/setlabel.html */
  setLabel: (str1: string, str2: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/setwalletflag.html */
  setWalletFlag: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/scantxoutset.html */
  scanTxOutSet: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/sendfrom.html */
  sendFrom: (
    str1: string,
    str2: string,
    float: number,
    int: number,
    str3: string,
    str4: string
  ) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/sendmany.html */
  sendMany: (
    str1: string,
    obj: Object,
    int: number,
    str2: string
  ) => Promise<any>; // not sure this is will work
  /** https://developer.bitcoin.org/reference/rpc/sendrawtransaction.html */
  sendRawTransaction: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/sendtoaddress.html */
  sendToAddress: (
    str1: string,
    float: number,
    str2: string,
    str3: string
  ) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/setaccount.html */
  setAccount: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/setban.html */
  setBan: (str1: string, str2: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/setnetworkactive.html */
  setNetworkActive: (bool: boolean) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/setgenerate.html */
  setGenerate: (bool: boolean, int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/settxfee.html */
  setTxFee: (float: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/signmessage.html */
  signMessage: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/signmessagewithprivkey.html */
  signMessageWithPrivKey: (str1: string, str2: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/signrawtransaction.html */
  signRawTransaction: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/signrawtransactionwithkey.html */
  signRawTransactionWithKey: (str: string, obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/signrawtransactionwithwallet.html */
  signRawTransactionWithWallet: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/stop.html */
  stop: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/submitblock.html */
  submitBlock: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/submitheader.html */
  submitHeader: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/testmempoolaccept.html */
  testMemPoolAccept: (obj: Object) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/unloadwallet.html */
  unloadWallet: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/upgradewallet.html */
  upgradeWallet: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/uptime.html */
  uptime: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/utxoupdatepsbt.html */
  utxoUpdatePSBT: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/validateaddress.html */
  validateAddress: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/verifychain.html */
  verifyChain: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/verifymessage.html */
  verifyMessage: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/verifytxoutproof.html */
  verifyTxOutProof: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/walletcreatefundedpsbt.html */
  walletCreateFundedPSBT: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/walletdisplayaddress.html */
  walletDisplayAddress: (str: string) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/walletlock.html */
  walletLock: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/walletpassphrase.html */
  walletPassPhrase: (str: string, int: number) => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/walletpassphrasechange.html */
  walletPassphraseChange: () => Promise<any>;
  /** https://developer.bitcoin.org/reference/rpc/walletprocesspsbt.html */
  walletProcessPSBT: (str: string) => Promise<any>;
}

function getRandomId() {
  return parseInt((Math.random() * 100000) as any as string);
}

export default RpcClient;

// // USAGE
// (async () => {
//   const x = new RpcClient("http://user:pass@127.0.0.1:18332").CallSpec;
//   console.log(await x.listUnspent(1, 2));
// })();
