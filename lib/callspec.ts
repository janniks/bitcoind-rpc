export interface RpcCallSpec {
  /** Mark in-wallet transaction <txid> as abandoned. This will mark this transaction and all its in-wallet descendants as abandoned which will allow. for their inputs to be respent.  It can be used to replace "stuck" or evicted transactions. It only works on transactions which are not included in a block and are not currently in the mempool. It has no effect on transactions which are already abandoned. https://developer.bitcoin.org/reference/rpc/abandontransaction.html */
  abandontransaction: ({
    txid,
  }: {
    /** The transaction id — required */
    txid: string;
  }) => Promise<any>;
  /** Stops current wallet rescan triggered by an RPC call, e.g. by an importprivkey call. Note: Use "getwalletinfo" to query the scanning progress. https://developer.bitcoin.org/reference/rpc/abortrescan.html */
  abortrescan: () => Promise<any>;
  /** Add an nrequired-to-sign multisignature address to the wallet. Requires a new wallet backup. Each key is a Bitcoin address or hex-encoded public key. This functionality is only intended for use with non-watchonly addresses. See `importaddress` for watchonly p2sh address support. If 'label' is specified, assign address to that label. https://developer.bitcoin.org/reference/rpc/addmultisigaddress.html */
  addmultisigaddress: ({
    nrequired,
    keys,
    label,
    address_type,
  }?: {
    /** The number of required signatures out of the n keys or addresses — required */
    nrequired: number;
    /** The bitcoin addresses or hex-encoded public keys — required */
    keys: JSON;
    /** A label to assign the addresses to — defaults to `optional` */
    label?: string;
    /** The address type to use. Options are "legacy" "p2sh-segwit" and "bech32" — defaults to `-addresstype` */
    address_type?: string;
  }) => Promise<any>;
  /** Attempts to add or remove a node from the addnode list. Or try a connection to a node once. Nodes added using addnode (or -connect) are protected from DoS disconnection and are not required to be. full nodes/support SegWit as other outbound peers are (though such peers will not be synced from). https://developer.bitcoin.org/reference/rpc/addnode.html */
  addnode: ({
    node,
    command,
  }: {
    /** The node (see getpeerinfo for nodes) — required */
    node: string;
    /** 'add' to add a node to the list 'remove' to remove a node from the list 'onetry' to try a connection to the node once — required */
    command: string;
  }) => Promise<any>;
  /** Analyzes and provides information about the current status of a PSBT and its inputs. https://developer.bitcoin.org/reference/rpc/analyzepsbt.html */
  analyzepsbt: ({
    psbt,
  }: {
    /** A base64 string of a PSBT — required */
    psbt: string;
  }) => Promise<any>;
  /** Safely copies current wallet file to destination, which can be a directory or a path with filename. https://developer.bitcoin.org/reference/rpc/backupwallet.html */
  backupwallet: ({
    destination,
  }: {
    /** The destination directory or file — required */
    destination: string;
  }) => Promise<any>;
  /** Bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction B. An opt-in RBF transaction with the given txid must be in the wallet. The command will pay the additional fee by reducing change outputs or adding inputs when necessary. It may add a new change output if one does not already exist. All inputs in the original transaction will be included in the replacement transaction. The command will fail if the wallet or mempool contains a transaction that spends one of T's outputs. By default, the new fee will be calculated automatically using the estimatesmartfee RPC. The user can specify a confirmation target for estimatesmartfee. Alternatively, the user can specify a fee rate in sat/vB for the new transaction. At a minimum, the new fee rate must be high enough to pay an additional new relay fee (incrementalfee. returned by getnetworkinfo) to enter the node's mempool. * WARNING: before version 0.21, fee_rate was in BTC/kvB. As of 0.21, fee_rate is in sat/vB. *. https://developer.bitcoin.org/reference/rpc/bumpfee.html */
  bumpfee: ({
    txid,
    options,
  }?: {
    /** The txid to be bumped — required */
    txid: string;
    /** defaults to `optional` */
    options?: JSON;
  }) => Promise<any>;
  /** Clear all banned IPs. https://developer.bitcoin.org/reference/rpc/clearbanned.html */
  clearbanned: () => Promise<any>;
  /** Combine multiple partially signed Bitcoin transactions into one transaction. Implements the Combiner role. https://developer.bitcoin.org/reference/rpc/combinepsbt.html */
  combinepsbt: ({
    txs,
  }: {
    /** The base64 strings of partially signed transactions — required */
    txs: JSON;
  }) => Promise<any>;
  /** Combine multiple partially signed transactions into one transaction. The combined transaction may be another partially signed transaction or a . fully signed transaction. Arguments:. 1. txs                 (json array, required) The hex strings of partially signed transactions.      [.        "hexstring",    (string) A hex-encoded raw transaction.        ...      ]. https://developer.bitcoin.org/reference/rpc/combinerawtransaction.html */
  combinerawtransaction: ({
    txs,
  }: {
    /** The hex strings of partially signed transactions — required */
    txs: JSON;
  }) => Promise<any>;
  /** Converts a network serialized transaction to a PSBT. This should be used only with createrawtransaction and fundrawtransaction. createpsbt and walletcreatefundedpsbt should be used for new applications. https://developer.bitcoin.org/reference/rpc/converttopsbt.html */
  converttopsbt: ({
    hexstring,
    permitsigdata,
    iswitness,
  }?: {
    /** The hex string of a raw transaction — required */
    hexstring: string;
    /** If true any signatures in the input will be discarded and conversion — defaults to `false` */
    permitsigdata?: boolean;
    /** Whether the transaction hex is a serialized witness transaction — defaults to `tests` */
    iswitness?: boolean;
  }) => Promise<any>;
  /** Creates a multi-signature address with n signature of m keys required. It returns a json object with the address and redeemScript. https://developer.bitcoin.org/reference/rpc/createmultisig.html */
  createmultisig: ({
    nrequired,
    keys,
    address_type,
  }?: {
    /** The number of required signatures out of the n keys — required */
    nrequired: number;
    /** The hex-encoded public keys — required */
    keys: JSON;
    /** The address type to use. Options are "legacy" "p2sh-segwit" and "bech32" — defaults to `legacy` */
    address_type?: string;
  }) => Promise<any>;
  /** Creates a transaction in the Partially Signed Transaction format. Implements the Creator role. https://developer.bitcoin.org/reference/rpc/createpsbt.html */
  createpsbt: ({
    inputs,
    outputs,
    locktime,
    replaceable,
  }?: {
    /** The json objects — required */
    inputs: JSON;
    /** The outputs (key-value pairs) where none of the keys are duplicated — required */
    outputs: JSON;
    /** Raw locktime. Non-0 value also locktime-activates inputs — defaults to `0` */
    locktime?: number;
    /** Marks this transaction as BIP125 replaceable — defaults to `false` */
    replaceable?: boolean;
  }) => Promise<any>;
  /** Create a transaction spending the given inputs and creating new outputs. Outputs can be addresses or data. Returns hex-encoded raw transaction. Note that the transaction's inputs are not signed, and. it is not stored in the wallet or transmitted to the network. https://developer.bitcoin.org/reference/rpc/createrawtransaction.html */
  createrawtransaction: ({
    inputs,
    outputs,
    locktime,
    replaceable,
  }?: {
    /** The inputs — required */
    inputs: JSON;
    /** The outputs (key-value pairs) where none of the keys are duplicated — required */
    outputs: JSON;
    /** Raw locktime. Non-0 value also locktime-activates inputs — defaults to `0` */
    locktime?: number;
    /** Marks this transaction as BIP125-replaceable — defaults to `false` */
    replaceable?: boolean;
  }) => Promise<any>;
  /** Creates and loads a new wallet. https://developer.bitcoin.org/reference/rpc/createwallet.html */
  createwallet: ({
    wallet_name,
    disable_private_keys,
    blank,
    passphrase,
    avoid_reuse,
    descriptors,
    load_on_startup,
  }?: {
    /** The name for the new wallet. If this is a path the wallet will be created at the path location — required */
    wallet_name: string;
    /** Disable the possibility of private keys (only watchonlys are possible in this mode) — defaults to `false` */
    disable_private_keys?: boolean;
    /** Create a blank wallet. A blank wallet has no keys or HD seed. One can be set using sethdseed — defaults to `false` */
    blank?: boolean;
    /** Encrypt the wallet with this passphrase — defaults to `string` */
    passphrase?: string;
    /** Keep track of coin reuse and treat dirty and clean coins differently with privacy considerations in mind — defaults to `false` */
    avoid_reuse?: boolean;
    /** Create a native descriptor wallet. The wallet will use descriptors internally to handle address creation — defaults to `false` */
    descriptors?: boolean;
    /** Save wallet name to persistent settings and load on startup. True to add wallet to startup list false to remove null to leave unchanged — defaults to `null` */
    load_on_startup?: boolean;
  }) => Promise<any>;
  /** Return a JSON object representing the serialized, base64-encoded partially signed Bitcoin transaction. https://developer.bitcoin.org/reference/rpc/decodepsbt.html */
  decodepsbt: ({
    psbt,
  }: {
    /** The PSBT base64 string — required */
    psbt: string;
  }) => Promise<any>;
  /** Return a JSON object representing the serialized, hex-encoded transaction. https://developer.bitcoin.org/reference/rpc/decoderawtransaction.html */
  decoderawtransaction: ({
    hexstring,
    iswitness,
  }?: {
    /** The transaction hex string — required */
    hexstring: string;
    /** Whether the transaction hex is a serialized witness transaction — defaults to `tests` */
    iswitness?: boolean;
  }) => Promise<any>;
  /** Decode a hex-encoded script. https://developer.bitcoin.org/reference/rpc/decodescript.html */
  decodescript: ({
    hexstring,
  }: {
    /** the hex-encoded script — required */
    hexstring: string;
  }) => Promise<any>;
  /** Derives one or more addresses corresponding to an output descriptor. Examples of output descriptors are:.     pkh(<pubkey>)                        P2PKH outputs for the given pubkey.     wpkh(<pubkey>)                       Native segwit P2PKH outputs for the given pubkey.     sh(multi(<n>,<pubkey>,<pubkey>,...)) P2SH-multisig outputs for the given threshold and pubkeys.     raw(<hex script>)                    Outputs whose scriptPubKey equals the specified hex scripts. https://developer.bitcoin.org/reference/rpc/deriveaddresses.html */
  deriveaddresses: ({
    descriptor,
    range,
  }?: {
    /** The descriptor — required */
    descriptor: string;
    /** If a ranged descriptor is used this specifies the end or the range (in [beginend] notation) to derive — defaults to `optional` */
    range?: number;
  }) => Promise<any>;
  /** Immediately disconnects from the specified peer node. https://developer.bitcoin.org/reference/rpc/disconnectnode.html */
  disconnectnode: ({
    address,
    nodeid,
  }?: {
    /** The IP address/port of the node — defaults to `nodeid` */
    address?: string;
    /** The node ID (see getpeerinfo for node IDs) — defaults to `address` */
    nodeid?: number;
  }) => Promise<any>;
  /** Reveals the private key corresponding to 'address'. Then the importprivkey can be used with this output. https://developer.bitcoin.org/reference/rpc/dumpprivkey.html */
  dumpprivkey: ({
    address,
  }: {
    /** The bitcoin address for the private key — required */
    address: string;
  }) => Promise<any>;
  /** Dumps all wallet keys in a human-readable format to a server-side file. This does not allow overwriting existing files. Imported scripts are included in the dumpfile, but corresponding BIP173 addresses, etc. may not be added automatically by importwallet. Note that if your wallet contains keys which are not derived from your HD seed (e.g. imported keys), these are not covered by. only backing up the seed itself, and must be backed up too (e.g. ensure you back up the whole dumpfile). https://developer.bitcoin.org/reference/rpc/dumpwallet.html */
  dumpwallet: ({
    filename,
  }: {
    /** The filename with path (absolute path recommended) — required */
    filename: string;
  }) => Promise<any>;
  /** Encrypts the wallet with 'passphrase'. This is for first time encryption. After this, any calls that interact with private keys such as sending or signing . will require the passphrase to be set prior the making these calls. Use the walletpassphrase call for this, and then walletlock call. If the wallet is already encrypted, use the walletpassphrasechange call. https://developer.bitcoin.org/reference/rpc/encryptwallet.html */
  encryptwallet: ({
    passphrase,
  }: {
    /** The pass phrase to encrypt the wallet with. It must be at least 1 character but should be long — required */
    passphrase: string;
  }) => Promise<any>;
  /** Estimates the approximate fee per kilobyte needed for a transaction to begin. confirmation within conf_target blocks if possible and return the number of blocks. for which the estimate is valid. Uses virtual transaction size as defined. in BIP 141 (witness data is discounted). https://developer.bitcoin.org/reference/rpc/estimatesmartfee.html */
  estimatesmartfee: ({
    conf_target,
    estimate_mode,
  }?: {
    /** Confirmation target in blocks (1 - 1008) — required */
    conf_target: number;
    /** The fee estimate mode — defaults to `CONSERVATIVE` */
    estimate_mode?: string;
  }) => Promise<any>;
  /** Arguments:. 1. psbt       (string, required) A base64 string of a PSBT. 2. extract    (boolean, optional, default=true) If true and the transaction is complete,.               extract and return the complete transaction in normal network serialization instead of the PSBT. https://developer.bitcoin.org/reference/rpc/finalizepsbt.html */
  finalizepsbt: ({
    psbt,
    extract,
  }?: {
    /** A base64 string of a PSBT — required */
    psbt: string;
    /** If true and the transaction is complete — defaults to `true` */
    extract?: boolean;
  }) => Promise<any>;
  /** If the transaction has no inputs, they will be automatically selected to meet its out value. It will add at most one change output to the outputs. No existing outputs will be modified unless "subtractFeeFromOutputs" is specified. Note that inputs which were signed may need to be resigned after completion since in/outputs have been added. The inputs added will not be signed, use signrawtransactionwithkey.  or signrawtransactionwithwallet for that. Note that all existing inputs must have their previous output transaction be in the wallet. Note that all inputs selected must be of standard form and P2SH scripts must be. in the wallet using importaddress or addmultisigaddress (to calculate fees). You can see whether this is the case by checking the "solvable" field in the listunspent output. Only pay-to-pubkey, multisig, and P2SH versions thereof are currently supported for watch-only. https://developer.bitcoin.org/reference/rpc/fundrawtransaction.html */
  fundrawtransaction: ({
    hexstring,
    options,
    iswitness,
  }?: {
    /** The hex string of the raw transaction — required */
    hexstring: string;
    /** for backward compatibility: passing in a true instead of an object will result in {"includeWatching":true} — defaults to `optional` */
    options?: JSON;
    /** Whether the transaction hex is a serialized witness transaction — defaults to `tests` */
    iswitness?: boolean;
  }) => Promise<any>;
  /** Mine a block with a set of ordered transactions immediately to a specified address or descriptor (before the RPC call returns). https://developer.bitcoin.org/reference/rpc/generateblock.html */
  generateblock: ({
    output,
    transactions,
  }: {
    /** The address or descriptor to send the newly generated bitcoin to — required */
    output: string;
    /** An array of hex strings which are either txids or raw transactions — required */
    transactions: JSON;
  }) => Promise<any>;
  /** Mine blocks immediately to a specified address (before the RPC call returns). https://developer.bitcoin.org/reference/rpc/generatetoaddress.html */
  generatetoaddress: ({
    nblocks,
    address,
    maxtries,
  }?: {
    /** How many blocks are generated immediately — required */
    nblocks: number;
    /** The address to send the newly generated bitcoin to — required */
    address: string;
    /** How many iterations to try — defaults to `1000000` */
    maxtries?: number;
  }) => Promise<any>;
  /** Mine blocks immediately to a specified descriptor (before the RPC call returns). https://developer.bitcoin.org/reference/rpc/generatetodescriptor.html */
  generatetodescriptor: ({
    num_blocks,
    descriptor,
    maxtries,
  }?: {
    /** How many blocks are generated immediately — required */
    num_blocks: number;
    /** The descriptor to send the newly generated bitcoin to — required */
    descriptor: string;
    /** How many iterations to try — defaults to `1000000` */
    maxtries?: number;
  }) => Promise<any>;
  /** Returns information about the given added node, or all added nodes. (note that onetry addnodes are not listed here). https://developer.bitcoin.org/reference/rpc/getaddednodeinfo.html */
  getaddednodeinfo: ({
    node,
  }?: {
    /** If provided return information about this specific node otherwise all nodes are returned — defaults to `nodes` */
    node?: string;
  }) => Promise<any>;
  /** Returns the list of addresses assigned the specified label. https://developer.bitcoin.org/reference/rpc/getaddressesbylabel.html */
  getaddressesbylabel: ({
    label,
  }: {
    /** The label — required */
    label: string;
  }) => Promise<any>;
  /** Return information about the given bitcoin address. Some of the information will only be present if the address is in the active wallet. https://developer.bitcoin.org/reference/rpc/getaddressinfo.html */
  getaddressinfo: ({
    address,
  }: {
    /** The bitcoin address for which to get information — required */
    address: string;
  }) => Promise<any>;
  /** Returns the total available balance. The available balance is what the wallet considers currently spendable, and is. thus affected by options which limit spendability such as -spendzeroconfchange. https://developer.bitcoin.org/reference/rpc/getbalance.html */
  getbalance: ({
    dummy,
    minconf,
    include_watchonly,
    avoid_reuse,
  }?: {
    /** Remains for backward compatibility. Must be excluded or set to "*" — defaults to `optional` */
    dummy?: string;
    /** Only include transactions confirmed at least this many times — defaults to `0` */
    minconf?: number;
    /** Also include balance in watch-only addresses (see 'importaddress') — defaults to `false` */
    include_watchonly?: boolean;
    /** (only available if avoid_reuse wallet flag is set) Do not include balance in dirty outputs; addresses are considered dirty if they have previously been used in a transaction — defaults to `true` */
    avoid_reuse?: boolean;
  }) => Promise<any>;
  /** Result:. {                               (json object).   "mine" : {                    (json object) balances from outputs that the wallet can sign.     "trusted" : n,              (numeric) trusted balance (outputs created by the wallet or confirmed outputs).     "untrusted_pending" : n,    (numeric) untrusted pending balance (outputs created by others that are in the mempool).     "immature" : n,             (numeric) balance from immature coinbase outputs.     "used" : n                  (numeric) (only present if avoid_reuse is set) balance from coins sent to addresses that were previously spent from (potentially privacy violating).   },.   "watchonly" : {               (json object) watchonly balances (not present if wallet does not watch anything).     "trusted" : n,              (numeric) trusted balance (outputs created by the wallet or confirmed outputs).     "untrusted_pending" : n,    (numeric) untrusted pending balance (outputs created by others that are in the mempool).     "immature" : n              (numeric) balance from immature coinbase outputs.   }. }. https://developer.bitcoin.org/reference/rpc/getbalances.html */
  getbalances: () => Promise<any>;
  /** Returns the hash of the best (tip) block in the most-work fully-validated chain. https://developer.bitcoin.org/reference/rpc/getbestblockhash.html */
  getbestblockhash: () => Promise<any>;
  /** If verbosity is 0, returns a string that is serialized, hex-encoded data for block 'hash'. If verbosity is 1, returns an Object with information about block <hash>. If verbosity is 2, returns an Object with information about block <hash> and information about each transaction. https://developer.bitcoin.org/reference/rpc/getblock.html */
  getblock: ({
    blockhash,
    verbosity,
  }?: {
    /** The block hash — required */
    blockhash: string;
    /** 0 for hex-encoded data 1 for a json object and 2 for json object with transaction data — defaults to `1` */
    verbosity?: number;
  }) => Promise<any>;
  /** Result:. {                                         (json object).   "chain" : "str",                        (string) current network name (main, test, regtest).   "blocks" : n,                           (numeric) the height of the most-work fully-validated chain. The genesis block has height 0.   "headers" : n,                          (numeric) the current number of headers we have validated.   "bestblockhash" : "str",                (string) the hash of the currently best block.   "difficulty" : n,                       (numeric) the current difficulty.   "mediantime" : n,                       (numeric) median time for the current best block.   "verificationprogress" : n,             (numeric) estimate of verification progress [0..1].   "initialblockdownload" : true|false,    (boolean) (debug information) estimate of whether this node is in Initial Block Download mode.   "chainwork" : "hex",                    (string) total amount of work in active chain, in hexadecimal.   "size_on_disk" : n,                     (numeric) the estimated size of the block and undo files on disk.   "pruned" : true|false,                  (boolean) if the blocks are subject to pruning.   "pruneheight" : n,                      (numeric) lowest-height complete block stored (only present if pruning is enabled).   "automatic_pruning" : true|false,       (boolean) whether automatic pruning is enabled (only present if pruning is enabled).   "prune_target_size" : n,                (numeric) the target size used by pruning (only present if automatic pruning is enabled).   "softforks" : {                         (json object) status of softforks.     "xxxx" : {                            (json object) name of the softfork.       "type" : "str",                     (string) one of "buried", "bip9".       "bip9" : {                          (json object) status of bip9 softforks (only for "bip9" type).         "status" : "str",                 (string) one of "defined", "started", "locked_in", "active", "failed".         "bit" : n,                        (numeric) the bit (0-28) in the block version field used to signal this softfork (only for "started" status).         "start_time" : xxx,               (numeric) the minimum median time past of a block at which the bit gains its meaning.         "timeout" : xxx,                  (numeric) the median time past of a block at which the deployment is considered failed if not yet locked in.         "since" : n,                      (numeric) height of the first block to which the status applies.         "min_activation_height" : n,      (numeric) minimum height of blocks for which the rules may be enforced.         "statistics" : {                  (json object) numeric statistics about BIP9 signalling for a softfork (only for "started" status).           "period" : n,                   (numeric) the length in blocks of the BIP9 signalling period.           "threshold" : n,                (numeric) the number of blocks with the version bit set required to activate the feature.           "elapsed" : n,                  (numeric) the number of blocks elapsed since the beginning of the current period.           "count" : n,                    (numeric) the number of blocks with the version bit set in the current period.           "possible" : true|false         (boolean) returns false if there are not enough blocks left in this period to pass activation threshold.         }.       },.       "height" : n,                       (numeric) height of the first block which the rules are or will be enforced (only for "buried" type, or "bip9" type with "active" status).       "active" : true|false               (boolean) true if the rules are enforced for the mempool and the next block.     },.     ...   },.   "warnings" : "str"                      (string) any network and blockchain warnings. }. https://developer.bitcoin.org/reference/rpc/getblockchaininfo.html */
  getblockchaininfo: () => Promise<any>;
  /** Returns the height of the most-work fully-validated chain. The genesis block has height 0. https://developer.bitcoin.org/reference/rpc/getblockcount.html */
  getblockcount: () => Promise<any>;
  /** Retrieve a BIP 157 content filter for a particular block. https://developer.bitcoin.org/reference/rpc/getblockfilter.html */
  getblockfilter: ({
    blockhash,
    filtertype,
  }?: {
    /** The hash of the block — required */
    blockhash: string;
    /** The type name of the filter — defaults to `basic` */
    filtertype?: string;
  }) => Promise<any>;
  /** Returns hash of block in best-block-chain at height provided. https://developer.bitcoin.org/reference/rpc/getblockhash.html */
  getblockhash: ({
    height,
  }: {
    /** The height index — required */
    height: number;
  }) => Promise<any>;
  /** If verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'. If verbose is true, returns an Object with information about blockheader <hash>. https://developer.bitcoin.org/reference/rpc/getblockheader.html */
  getblockheader: ({
    blockhash,
    verbose,
  }?: {
    /** The block hash — required */
    blockhash: string;
    /** true for a json object false for the hex-encoded data — defaults to `true` */
    verbose?: boolean;
  }) => Promise<any>;
  /** Compute per block statistics for a given window. All amounts are in satoshis. It won't work for some heights with pruning. https://developer.bitcoin.org/reference/rpc/getblockstats.html */
  getblockstats: ({
    hash_or_height,
    stats,
  }?: {
    /** The block hash or height of the target block — required */
    hash_or_height: string;
    /** Values to plot (see result below) — defaults to `values` */
    stats?: JSON;
  }) => Promise<any>;
  /** If the request parameters include a 'mode' key, that is used to explicitly select between the default 'template' request or a 'proposal'. It returns data needed to construct a block to work on. For full specification, see BIPs 22, 23, 9, and 145:.     https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki.     https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki.     https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes.     https://github.com/bitcoin/bips/blob/master/bip-0145.mediawiki. https://developer.bitcoin.org/reference/rpc/getblocktemplate.html */
  getblocktemplate: ({
    template_request,
  }?: {
    /** Format of the template — defaults to `{}` */
    template_request?: JSON;
  }) => Promise<any>;
  /** Result:. [                        (json array).   {                      (json object).     "height" : n,        (numeric) height of the chain tip.     "hash" : "hex",      (string) block hash of the tip.     "branchlen" : n,     (numeric) zero for main chain, otherwise length of branch connecting the tip to the main chain.     "status" : "str"     (string) status of the chain, "active" for the main chain.                          Possible values for status:.                          1.  "invalid"               This branch contains at least one invalid block.                          2.  "headers-only"          Not all blocks for this branch are available, but the headers are valid.                          3.  "valid-headers"         All blocks are available for this branch, but they were never fully validated.                          4.  "valid-fork"            This branch is not part of the active chain, but is fully validated.                          5.  "active"                This is the tip of the active main chain, which is certainly valid.   },.   ... ]. https://developer.bitcoin.org/reference/rpc/getchaintips.html */
  getchaintips: () => Promise<any>;
  /** Compute statistics about the total number and rate of transactions in the chain. https://developer.bitcoin.org/reference/rpc/getchaintxstats.html */
  getchaintxstats: ({
    nblocks,
    blockhash,
  }?: {
    /** Size of the window in number of blocks — defaults to `month` */
    nblocks?: number;
    /** The hash of the block that ends the window — defaults to `tip` */
    blockhash?: string;
  }) => Promise<any>;
  /** Returns the number of connections to other nodes. https://developer.bitcoin.org/reference/rpc/getconnectioncount.html */
  getconnectioncount: () => Promise<any>;
  /** Analyses a descriptor. https://developer.bitcoin.org/reference/rpc/getdescriptorinfo.html */
  getdescriptorinfo: ({
    descriptor,
  }: {
    /** The descriptor — required */
    descriptor: string;
  }) => Promise<any>;
  /** Returns the proof-of-work difficulty as a multiple of the minimum difficulty. https://developer.bitcoin.org/reference/rpc/getdifficulty.html */
  getdifficulty: () => Promise<any>;
  /** Returns the status of one or all available indices currently running in the node. https://developer.bitcoin.org/reference/rpc/getindexinfo.html */
  getindexinfo: ({
    index_name,
  }?: {
    /** Filter results for an index with a specific name — defaults to `optional` */
    index_name?: string;
  }) => Promise<any>;
  /** Arguments:. 1. mode    (string, optional, default="stats") determines what kind of information is returned.            - "stats" returns general statistics about memory usage in the daemon.            - "mallocinfo" returns an XML string describing low-level heap state (only available if compiled with glibc 2.10+). https://developer.bitcoin.org/reference/rpc/getmemoryinfo.html */
  getmemoryinfo: ({
    mode,
  }?: {
    /** determines what kind of information is returned — defaults to `"stats"` */
    mode?: string;
  }) => Promise<any>;
  /** If txid is in the mempool, returns all in-mempool ancestors. https://developer.bitcoin.org/reference/rpc/getmempoolancestors.html */
  getmempoolancestors: ({
    txid,
    verbose,
  }?: {
    /** The transaction id (must be in mempool) — required */
    txid: string;
    /** True for a json object false for array of transaction ids — defaults to `false` */
    verbose?: boolean;
  }) => Promise<any>;
  /** If txid is in the mempool, returns all in-mempool descendants. https://developer.bitcoin.org/reference/rpc/getmempooldescendants.html */
  getmempooldescendants: ({
    txid,
    verbose,
  }?: {
    /** The transaction id (must be in mempool) — required */
    txid: string;
    /** True for a json object false for array of transaction ids — defaults to `false` */
    verbose?: boolean;
  }) => Promise<any>;
  /** Returns mempool data for given transaction. https://developer.bitcoin.org/reference/rpc/getmempoolentry.html */
  getmempoolentry: ({
    txid,
  }: {
    /** The transaction id (must be in mempool) — required */
    txid: string;
  }) => Promise<any>;
  /** Returns details on the active state of the TX memory pool. https://developer.bitcoin.org/reference/rpc/getmempoolinfo.html */
  getmempoolinfo: () => Promise<any>;
  /** Returns a json object containing mining-related information. Result:. {                              (json object).   "blocks" : n,                (numeric) The current block.   "currentblockweight" : n,    (numeric, optional) The block weight of the last assembled block (only present if a block was ever assembled).   "currentblocktx" : n,        (numeric, optional) The number of block transactions of the last assembled block (only present if a block was ever assembled).   "difficulty" : n,            (numeric) The current difficulty.   "networkhashps" : n,         (numeric) The network hashes per second.   "pooledtx" : n,              (numeric) The size of the mempool.   "chain" : "str",             (string) current network name (main, test, regtest).   "warnings" : "str"           (string) any network and blockchain warnings. }. https://developer.bitcoin.org/reference/rpc/getmininginfo.html */
  getmininginfo: () => Promise<any>;
  /** Returns information about network traffic, including bytes in, bytes out,. and current time. https://developer.bitcoin.org/reference/rpc/getnettotals.html */
  getnettotals: () => Promise<any>;
  /** Returns the estimated network hashes per second based on the last n blocks. Pass in [blocks] to override # of blocks, -1 specifies since last difficulty change. Pass in [height] to estimate the network speed at the time when a certain block was found. https://developer.bitcoin.org/reference/rpc/getnetworkhashps.html */
  getnetworkhashps: ({
    nblocks,
    height,
  }?: {
    /** The number of blocks or -1 for blocks since last difficulty change — defaults to `120` */
    nblocks?: number;
    /** To estimate at the time of the given height — defaults to `-1` */
    height?: number;
  }) => Promise<any>;
  /** Result:. {                                                    (json object).   "version" : n,                                     (numeric) the server version.   "subversion" : "str",                              (string) the server subversion string.   "protocolversion" : n,                             (numeric) the protocol version.   "localservices" : "hex",                           (string) the services we offer to the network.   "localservicesnames" : [                           (json array) the services we offer to the network, in human-readable form.     "str",                                           (string) the service name.     ...   ],.   "localrelay" : true|false,                         (boolean) true if transaction relay is requested from peers.   "timeoffset" : n,                                  (numeric) the time offset.   "connections" : n,                                 (numeric) the total number of connections.   "connections_in" : n,                              (numeric) the number of inbound connections.   "connections_out" : n,                             (numeric) the number of outbound connections.   "networkactive" : true|false,                      (boolean) whether p2p networking is enabled.   "networks" : [                                     (json array) information per network.     {                                                (json object).       "name" : "str",                                (string) network (ipv4, ipv6 or onion).       "limited" : true|false,                        (boolean) is the network limited using -onlynet?.       "reachable" : true|false,                      (boolean) is the network reachable?.       "proxy" : "str",                               (string) ("host:port") the proxy that is used for this network, or empty if none.       "proxy_randomize_credentials" : true|false     (boolean) Whether randomized credentials are used.     },.     ...   ],.   "relayfee" : n,                                    (numeric) minimum relay fee for transactions in BTC/kB.   "incrementalfee" : n,                              (numeric) minimum fee increment for mempool limiting or BIP 125 replacement in BTC/kB.   "localaddresses" : [                               (json array) list of local addresses.     {                                                (json object).       "address" : "str",                             (string) network address.       "port" : n,                                    (numeric) network port.       "score" : n                                    (numeric) relative score.     },.     ...   ],.   "warnings" : "str"                                 (string) any network and blockchain warnings. }. https://developer.bitcoin.org/reference/rpc/getnetworkinfo.html */
  getnetworkinfo: () => Promise<any>;
  /** Returns a new Bitcoin address for receiving payments. If 'label' is specified, it is added to the address book . so payments received with the address will be associated with 'label'. https://developer.bitcoin.org/reference/rpc/getnewaddress.html */
  getnewaddress: ({
    label,
    address_type,
  }?: {
    /** The label name for the address to be linked to. It can also be set to the empty string "" to represent the default label. The label does not need to exist it will be created if there is no label by the given name — defaults to `""` */
    label?: string;
    /** The address type to use. Options are "legacy" "p2sh-segwit" and "bech32" — defaults to `-addresstype` */
    address_type?: string;
  }) => Promise<any>;
  /** Return known addresses which can potentially be used to find new nodes in the network. https://developer.bitcoin.org/reference/rpc/getnodeaddresses.html */
  getnodeaddresses: ({
    count,
  }?: {
    /** The maximum number of addresses to return. Specify 0 to return all known addresses — defaults to `1` */
    count?: number;
  }) => Promise<any>;
  /** Returns data about each connected network node as a json array of objects. https://developer.bitcoin.org/reference/rpc/getpeerinfo.html */
  getpeerinfo: () => Promise<any>;
  /** Returns a new Bitcoin address, for receiving change. This is for use with raw transactions, NOT normal use. https://developer.bitcoin.org/reference/rpc/getrawchangeaddress.html */
  getrawchangeaddress: ({
    address_type,
  }?: {
    /** The address type to use. Options are "legacy" "p2sh-segwit" and "bech32" — defaults to `-changetype` */
    address_type?: string;
  }) => Promise<any>;
  /** Returns all transaction ids in memory pool as a json array of string transaction ids. https://developer.bitcoin.org/reference/rpc/getrawmempool.html */
  getrawmempool: ({
    verbose,
    mempool_sequence,
  }?: {
    /** True for a json object false for array of transaction ids — defaults to `false` */
    verbose?: boolean;
    /** If verbose=false returns a json object with transaction list and mempool sequence number attached — defaults to `false` */
    mempool_sequence?: boolean;
  }) => Promise<any>;
  /** Return the raw transaction data. https://developer.bitcoin.org/reference/rpc/getrawtransaction.html */
  getrawtransaction: ({
    txid,
    verbose,
    blockhash,
  }?: {
    /** The transaction id — required */
    txid: string;
    /** If false return a string otherwise return a json object — defaults to `false` */
    verbose?: boolean;
    /** The block in which to look for the transaction — defaults to `optional` */
    blockhash?: string;
  }) => Promise<any>;
  /** Returns the total amount received by the given address in transactions with at least minconf confirmations. https://developer.bitcoin.org/reference/rpc/getreceivedbyaddress.html */
  getreceivedbyaddress: ({
    address,
    minconf,
  }?: {
    /** The bitcoin address for transactions — required */
    address: string;
    /** Only include transactions confirmed at least this many times — defaults to `1` */
    minconf?: number;
  }) => Promise<any>;
  /** Returns the total amount received by addresses with <label> in transactions with at least [minconf] confirmations. https://developer.bitcoin.org/reference/rpc/getreceivedbylabel.html */
  getreceivedbylabel: ({
    label,
    minconf,
  }?: {
    /** The selected label may be the default label using "" — required */
    label: string;
    /** Only include transactions confirmed at least this many times — defaults to `1` */
    minconf?: number;
  }) => Promise<any>;
  /** Returns details of the RPC server. https://developer.bitcoin.org/reference/rpc/getrpcinfo.html */
  getrpcinfo: () => Promise<any>;
  /** Get detailed information about in-wallet transaction <txid>. https://developer.bitcoin.org/reference/rpc/gettransaction.html */
  gettransaction: ({
    txid,
    include_watchonly,
    verbose,
  }?: {
    /** The transaction id — required */
    txid: string;
    /** Whether to include watch-only addresses in balance calculation and details[] — defaults to `false` */
    include_watchonly?: boolean;
    /** Whether to include a `decoded` field containing the decoded transaction (equivalent to RPC decoderawtransaction) — defaults to `false` */
    verbose?: boolean;
  }) => Promise<any>;
  /** Returns details about an unspent transaction output. https://developer.bitcoin.org/reference/rpc/gettxout.html */
  gettxout: ({
    txid,
    n,
    include_mempool,
  }?: {
    /** The transaction id — required */
    txid: string;
    /** vout number — required */
    n: number;
    /** Whether to include the mempool. Note that an unspent output that is spent in the mempool won't appear — defaults to `true` */
    include_mempool?: boolean;
  }) => Promise<any>;
  /** Returns a hex-encoded proof that "txid" was included in a block. https://developer.bitcoin.org/reference/rpc/gettxoutproof.html */
  gettxoutproof: ({
    txids,
    blockhash,
  }?: {
    /** The txids to filter — required */
    txids: JSON;
    /** If specified looks for txid in the block with this hash — defaults to `optional` */
    blockhash?: string;
  }) => Promise<any>;
  /** Returns statistics about the unspent transaction output set. Note this call may take some time. https://developer.bitcoin.org/reference/rpc/gettxoutsetinfo.html */
  gettxoutsetinfo: ({
    hash_type,
  }?: {
    /** Which UTXO set hash should be calculated. Options: 'hash_serialized_2' (the legacy algorithm) 'none' — defaults to `hash_serialized_2` */
    hash_type?: string;
  }) => Promise<any>;
  /**  https://developer.bitcoin.org/reference/rpc/getunconfirmedbalance.html */
  getunconfirmedbalance: () => Promise<any>;
  /** Result:. {                                         (json object).   "walletname" : "str",                   (string) the wallet name.   "walletversion" : n,                    (numeric) the wallet version.   "format" : "str",                       (string) the database format (bdb or sqlite).   "balance" : n,                          (numeric) DEPRECATED. Identical to getbalances().mine.trusted.   "unconfirmed_balance" : n,              (numeric) DEPRECATED. Identical to getbalances().mine.untrusted_pending.   "immature_balance" : n,                 (numeric) DEPRECATED. Identical to getbalances().mine.immature.   "txcount" : n,                          (numeric) the total number of transactions in the wallet.   "keypoololdest" : xxx,                  (numeric) the UNIX epoch time of the oldest pre-generated key in the key pool. Legacy wallets only.   "keypoolsize" : n,                      (numeric) how many new keys are pre-generated (only counts external keys).   "keypoolsize_hd_internal" : n,          (numeric) how many new keys are pre-generated for internal use (used for change outputs, only appears if the wallet is using this feature, otherwise external keys are used).   "unlocked_until" : xxx,                 (numeric, optional) the UNIX epoch time until which the wallet is unlocked for transfers, or 0 if the wallet is locked (only present for passphrase-encrypted wallets).   "paytxfee" : n,                         (numeric) the transaction fee configuration, set in BTC/kvB.   "hdseedid" : "hex",                     (string, optional) the Hash160 of the HD seed (only present when HD is enabled).   "private_keys_enabled" : true|false,    (boolean) false if privatekeys are disabled for this wallet (enforced watch-only wallet).   "avoid_reuse" : true|false,             (boolean) whether this wallet tracks clean/dirty coins in terms of reuse.   "scanning" : {                          (json object) current scanning details, or false if no scan is in progress.     "duration" : n,                       (numeric) elapsed seconds since scan start.     "progress" : n                        (numeric) scanning progress percentage [0.0, 1.0].   },.   "descriptors" : true|false              (boolean) whether this wallet uses descriptors for scriptPubKey management. }. https://developer.bitcoin.org/reference/rpc/getwalletinfo.html */
  getwalletinfo: () => Promise<any>;
  /** Returns information about the active ZeroMQ notifications. https://developer.bitcoin.org/reference/rpc/getzmqnotifications.html */
  getzmqnotifications: () => Promise<any>;
  /** List all commands, or get help for a specified command. https://developer.bitcoin.org/reference/rpc/help.html */
  help: ({
    command,
  }?: {
    /** The command to get help on — defaults to `commands` */
    command?: string;
  }) => Promise<any>;
  /** Adds an address or script (in hex) that can be watched as if it were in your wallet but cannot be used to spend. Requires a new wallet backup. https://developer.bitcoin.org/reference/rpc/importaddress.html */
  importaddress: ({
    address,
    label,
    rescan,
  }?: {
    /** The Bitcoin address (or hex-encoded script) — required */
    address: string;
    /** An optional label — defaults to `""` */
    label?: string;
    /** Rescan the wallet for transactions — defaults to `true` */
    rescan?: boolean;
  }) => Promise<any>;
  /** Import descriptors. This will trigger a rescan of the blockchain based on the earliest timestamp of all descriptors being imported. Requires a new wallet backup. https://developer.bitcoin.org/reference/rpc/importdescriptors.html */
  importdescriptors: ({
    requests,
  }: {
    /** Data to be imported — required */
    requests: JSON;
  }) => Promise<any>;
  /** Import addresses/scripts (with private or public keys, redeem script (P2SH)), optionally rescanning the blockchain from the earliest creation time of the imported scripts. Requires a new wallet backup. If an address/script is imported without all of the private keys required to spend from that address, it will be watchonly. The 'watchonly' option must be set to true in this case or a warning will be returned. Conversely, if all the private keys are provided and the address/script is spendable, the watchonly option must be set to false, or a warning will be returned. https://developer.bitcoin.org/reference/rpc/importmulti.html */
  importmulti: ({
    requests,
    options,
  }?: {
    /** Data to be imported — required */
    requests: JSON;
    /** defaults to `optional` */
    options?: JSON;
  }) => Promise<any>;
  /** Adds a private key (as returned by dumpprivkey) to your wallet. Requires a new wallet backup. Hint: use importmulti to import more than one private key. https://developer.bitcoin.org/reference/rpc/importprivkey.html */
  importprivkey: ({
    privkey,
    label,
    rescan,
  }?: {
    /** The private key (see dumpprivkey) — required */
    privkey: string;
    /** An optional label — defaults to `""` */
    label?: string;
    /** Rescan the wallet for transactions — defaults to `true` */
    rescan?: boolean;
  }) => Promise<any>;
  /** Imports funds without rescan. Corresponding address or script must previously be included in wallet. Aimed towards pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported outputs or rescan after the point in the blockchain the transaction is included. https://developer.bitcoin.org/reference/rpc/importprunedfunds.html */
  importprunedfunds: ({
    rawtransaction,
    txoutproof,
  }: {
    /** A raw transaction in hex funding an already-existing address in wallet — required */
    rawtransaction: string;
    /** The hex output from gettxoutproof that contains the transaction — required */
    txoutproof: string;
  }) => Promise<any>;
  /** Adds a public key (in hex) that can be watched as if it were in your wallet but cannot be used to spend. Requires a new wallet backup. Hint: use importmulti to import more than one public key. https://developer.bitcoin.org/reference/rpc/importpubkey.html */
  importpubkey: ({
    pubkey,
    label,
    rescan,
  }?: {
    /** The hex-encoded public key — required */
    pubkey: string;
    /** An optional label — defaults to `""` */
    label?: string;
    /** Rescan the wallet for transactions — defaults to `true` */
    rescan?: boolean;
  }) => Promise<any>;
  /** Imports keys from a wallet dump file (see dumpwallet). Requires a new wallet backup to include imported keys. Note: Use "getwalletinfo" to query the scanning progress. https://developer.bitcoin.org/reference/rpc/importwallet.html */
  importwallet: ({
    filename,
  }: {
    /** The wallet file — required */
    filename: string;
  }) => Promise<any>;
  /** Joins multiple distinct PSBTs with different inputs and outputs into one PSBT with inputs and outputs from all of the PSBTs. No input in any of the PSBTs can be in more than one of the PSBTs. https://developer.bitcoin.org/reference/rpc/joinpsbts.html */
  joinpsbts: ({
    txs,
  }: {
    /** The base64 strings of partially signed transactions — required */
    txs: JSON;
  }) => Promise<any>;
  /** Fills the keypool. Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted. https://developer.bitcoin.org/reference/rpc/keypoolrefill.html */
  keypoolrefill: ({
    newsize,
  }?: {
    /** The new keypool size — defaults to `100` */
    newsize?: number;
  }) => Promise<any>;
  /** Lists groups of addresses which have had their common ownership. made public by common use as inputs or as the resulting change. in past transactions. https://developer.bitcoin.org/reference/rpc/listaddressgroupings.html */
  listaddressgroupings: () => Promise<any>;
  /** List all manually banned IPs/Subnets. https://developer.bitcoin.org/reference/rpc/listbanned.html */
  listbanned: () => Promise<any>;
  /** Returns the list of all labels, or labels that are assigned to addresses with a specific purpose. https://developer.bitcoin.org/reference/rpc/listlabels.html */
  listlabels: ({
    purpose,
  }?: {
    /** Address purpose to list labels for ('send''receive'). An empty string is the same as not providing this argument — defaults to `optional` */
    purpose?: string;
  }) => Promise<any>;
  /** Returns list of temporarily unspendable outputs. See the lockunspent call to lock and unlock transactions for spending. https://developer.bitcoin.org/reference/rpc/listlockunspent.html */
  listlockunspent: () => Promise<any>;
  /** List balances by receiving address. https://developer.bitcoin.org/reference/rpc/listreceivedbyaddress.html */
  listreceivedbyaddress: ({
    minconf,
    include_empty,
    include_watchonly,
    address_filter,
  }?: {
    /** The minimum number of confirmations before payments are included — defaults to `1` */
    minconf?: number;
    /** Whether to include addresses that haven't received any payments — defaults to `false` */
    include_empty?: boolean;
    /** Whether to include watch-only addresses (see 'importaddress') — defaults to `false` */
    include_watchonly?: boolean;
    /** If present only return information on this address — defaults to `optional` */
    address_filter?: string;
  }) => Promise<any>;
  /** List received transactions by label. https://developer.bitcoin.org/reference/rpc/listreceivedbylabel.html */
  listreceivedbylabel: ({
    minconf,
    include_empty,
    include_watchonly,
  }?: {
    /** The minimum number of confirmations before payments are included — defaults to `1` */
    minconf?: number;
    /** Whether to include labels that haven't received any payments — defaults to `false` */
    include_empty?: boolean;
    /** Whether to include watch-only addresses (see 'importaddress') — defaults to `false` */
    include_watchonly?: boolean;
  }) => Promise<any>;
  /** Get all transactions in blocks since block [blockhash], or all transactions if omitted. If "blockhash" is no longer a part of the main chain, transactions from the fork point onward are included. Additionally, if include_removed is set, transactions affecting the wallet which were removed are returned in the "removed" array. https://developer.bitcoin.org/reference/rpc/listsinceblock.html */
  listsinceblock: ({
    blockhash,
    target_confirmations,
    include_watchonly,
    include_removed,
  }?: {
    /** If set the block hash to list transactions since otherwise list all transactions — defaults to `optional` */
    blockhash?: string;
    /** Return the nth block hash from the main chain. e.g. 1 would mean the best block hash. Note: this is not used as a filter but only affects [lastblock] in the return value — defaults to `1` */
    target_confirmations?: number;
    /** Include transactions to watch-only addresses (see 'importaddress') — defaults to `false` */
    include_watchonly?: boolean;
    /** Show transactions that were removed due to a reorg in the "removed" array — defaults to `true` */
    include_removed?: boolean;
  }) => Promise<any>;
  /** If a label name is provided, this will return only incoming transactions paying to addresses with the specified label. https://developer.bitcoin.org/reference/rpc/listtransactions.html */
  listtransactions: ({
    label,
    count,
    skip,
    include_watchonly,
  }?: {
    /** If set should be a valid label name to return only incoming transactions — defaults to `optional` */
    label?: string;
    /** The number of transactions to return — defaults to `10` */
    count?: number;
    /** The number of transactions to skip — defaults to `0` */
    skip?: number;
    /** Include transactions to watch-only addresses (see 'importaddress') — defaults to `false` */
    include_watchonly?: boolean;
  }) => Promise<any>;
  /** Returns array of unspent transaction outputs. with between minconf and maxconf (inclusive) confirmations. Optionally filter to only include txouts paid to specified addresses. https://developer.bitcoin.org/reference/rpc/listunspent.html */
  listunspent: ({
    minconf,
    maxconf,
    addresses,
    include_unsafe,
    query_options,
  }?: {
    /** The minimum confirmations to filter — defaults to `1` */
    minconf?: number;
    /** The maximum confirmations to filter — defaults to `9999999` */
    maxconf?: number;
    /** The bitcoin addresses to filter — defaults to `array` */
    addresses?: JSON;
    /** Include outputs that are not safe to spend — defaults to `true` */
    include_unsafe?: boolean;
    /** JSON with query options — defaults to `optional` */
    query_options?: JSON;
  }) => Promise<any>;
  /** Result:. {                        (json object).   "wallets" : [          (json array).     {                    (json object).       "name" : "str"     (string) The wallet name.     },.     ...   ]. }. https://developer.bitcoin.org/reference/rpc/listwalletdir.html */
  listwalletdir: () => Promise<any>;
  /** Result:. [           (json array).   "str",    (string) the wallet name.   ... ]. https://developer.bitcoin.org/reference/rpc/listwallets.html */
  listwallets: () => Promise<any>;
  /** Loads a wallet from a wallet file or directory. Note that all wallet command-line options used when starting bitcoind will be. applied to the new wallet (eg -rescan, etc). https://developer.bitcoin.org/reference/rpc/loadwallet.html */
  loadwallet: ({
    filename,
    load_on_startup,
  }?: {
    /** The wallet directory or .dat file — required */
    filename: string;
    /** Save wallet name to persistent settings and load on startup. True to add wallet to startup list false to remove null to leave unchanged — defaults to `null` */
    load_on_startup?: boolean;
  }) => Promise<any>;
  /** Updates list of temporarily unspendable outputs. Temporarily lock (unlock=false) or unlock (unlock=true) specified transaction outputs. If no transaction outputs are specified when unlocking then all current locked transaction outputs are unlocked. A locked transaction output will not be chosen by automatic coin selection, when spending bitcoins. Manually selected coins are automatically unlocked. Locks are stored in memory only. Nodes start with zero locked outputs, and the locked output list. is always cleared (by virtue of process exit) when a node stops or fails. Also see the listunspent call. https://developer.bitcoin.org/reference/rpc/lockunspent.html */
  lockunspent: ({
    unlock,
    transactions,
  }?: {
    /** Whether to unlock (true) or lock (false) the specified transactions — required */
    unlock: boolean;
    /** The transaction outputs and within each the txid (string) vout (numeric) — defaults to `array` */
    transactions?: JSON;
  }) => Promise<any>;
  /** Arguments:. 1. include                    (json array, optional) The categories to add to debug logging.      [.        "include_category",    (string) the valid logging category.        ...      ]. 2. exclude                    (json array, optional) The categories to remove from debug logging.      [.        "exclude_category",    (string) the valid logging category.        ...      ]. https://developer.bitcoin.org/reference/rpc/logging.html */
  logging: ({
    include,
    exclude,
  }?: {
    /** The categories to add to debug logging — defaults to `optional` */
    include?: JSON;
    /** The categories to remove from debug logging — defaults to `optional` */
    exclude?: JSON;
  }) => Promise<any>;
  /** Requests that a ping be sent to all other nodes, to measure ping time. Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds. Ping command is handled in queue with all other commands, so it measures processing backlog, not just network ping. https://developer.bitcoin.org/reference/rpc/ping.html */
  ping: () => Promise<any>;
  /** Treats a block as if it were received before others with the same work. https://developer.bitcoin.org/reference/rpc/preciousblock.html */
  preciousblock: ({
    blockhash,
  }: {
    /** the hash of the block to mark as precious — required */
    blockhash: string;
  }) => Promise<any>;
  /** Arguments:. 1. txid         (string, required) The transaction id. 2. dummy        (numeric, optional) API-Compatibility for previous API. Must be zero or null.                 DEPRECATED. For forward compatibility use named arguments and omit this parameter. 3. fee_delta    (numeric, required) The fee value (in satoshis) to add (or subtract, if negative).                 Note, that this value is not a fee rate. It is a value to modify absolute fee of the TX.                 The fee is not actually paid, only the algorithm for selecting transactions into a block.                 considers the transaction as it would have paid a higher (or lower) fee. https://developer.bitcoin.org/reference/rpc/prioritisetransaction.html */
  prioritisetransaction: ({
    txid,
    dummy,
    fee_delta,
  }?: {
    /** The transaction id — required */
    txid: string;
    /** API-Compatibility for previous API. Must be zero or null — defaults to `optional` */
    dummy?: number;
    /** The fee value (in satoshis) to add (or subtract if negative) — required */
    fee_delta: number;
  }) => Promise<any>;
  /** Arguments:. 1. height    (numeric, required) The block height to prune up to. May be set to a discrete height, or to a UNIX epoch time.              to prune blocks whose block time is at least 2 hours older than the provided timestamp. https://developer.bitcoin.org/reference/rpc/pruneblockchain.html */
  pruneblockchain: ({
    height,
  }: {
    /** The block height to prune up to. May be set to a discrete height or to a UNIX epoch time — required */
    height: number;
  }) => Promise<any>;
  /** Bumps the fee of an opt-in-RBF transaction T, replacing it with a new transaction B. Returns a PSBT instead of creating and signing a new transaction. An opt-in RBF transaction with the given txid must be in the wallet. The command will pay the additional fee by reducing change outputs or adding inputs when necessary. It may add a new change output if one does not already exist. All inputs in the original transaction will be included in the replacement transaction. The command will fail if the wallet or mempool contains a transaction that spends one of T's outputs. By default, the new fee will be calculated automatically using the estimatesmartfee RPC. The user can specify a confirmation target for estimatesmartfee. Alternatively, the user can specify a fee rate in sat/vB for the new transaction. At a minimum, the new fee rate must be high enough to pay an additional new relay fee (incrementalfee. returned by getnetworkinfo) to enter the node's mempool. * WARNING: before version 0.21, fee_rate was in BTC/kvB. As of 0.21, fee_rate is in sat/vB. *. https://developer.bitcoin.org/reference/rpc/psbtbumpfee.html */
  psbtbumpfee: ({
    txid,
    options,
  }?: {
    /** The txid to be bumped — required */
    txid: string;
    /** defaults to `optional` */
    options?: JSON;
  }) => Promise<any>;
  /** Deletes the specified transaction from the wallet. Meant for use with pruned wallets and as a companion to importprunedfunds. This will affect wallet balances. https://developer.bitcoin.org/reference/rpc/removeprunedfunds.html */
  removeprunedfunds: ({
    txid,
  }: {
    /** The hex-encoded id of the transaction you are deleting — required */
    txid: string;
  }) => Promise<any>;
  /** Rescan the local blockchain for wallet related transactions. Note: Use "getwalletinfo" to query the scanning progress. https://developer.bitcoin.org/reference/rpc/rescanblockchain.html */
  rescanblockchain: ({
    start_height,
    stop_height,
  }?: {
    /** block height where the rescan should start — defaults to `0` */
    start_height?: number;
    /** the last block height that should be scanned. If none is provided it will rescan up to the tip at return time of this call — defaults to `optional` */
    stop_height?: number;
  }) => Promise<any>;
  /** Dumps the mempool to disk. It will fail until the previous dump is fully loaded. https://developer.bitcoin.org/reference/rpc/savemempool.html */
  savemempool: () => Promise<any>;
  /** EXPERIMENTAL warning: this call may be removed or changed in future releases. https://developer.bitcoin.org/reference/rpc/scantxoutset.html */
  scantxoutset: ({
    action,
    scanobjects,
  }?: {
    /** The action to execute — required */
    action: string;
    /** Array of scan objects. Required for "start" action — defaults to `array` */
    scanobjects?: JSON;
  }) => Promise<any>;
  /** EXPERIMENTAL warning: this call may be changed in future releases. https://developer.bitcoin.org/reference/rpc/send.html */
  send: ({
    outputs,
    conf_target,
    estimate_mode,
    fee_rate,
    options,
  }?: {
    /** The outputs (key-value pairs) where none of the keys are duplicated — required */
    outputs: JSON;
    /** Confirmation target in blocks — defaults to `-txconfirmtarget` */
    conf_target?: number;
    /** The fee estimate mode must be one of (case insensitive): — defaults to `unset` */
    estimate_mode?: string;
    /** Specify a fee rate in sat/vB — defaults to `estimation` */
    fee_rate?: number;
    /** defaults to `optional` */
    options?: JSON;
  }) => Promise<any>;
  /** Send multiple times. Amounts are double-precision floating point numbers. Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted. https://developer.bitcoin.org/reference/rpc/sendmany.html */
  sendmany: ({
    dummy,
    amounts,
    minconf,
    comment,
    subtractfeefrom,
    replaceable,
    conf_target,
    estimate_mode,
    fee_rate,
    verbose,
  }?: {
    /** Must be set to "" for backwards compatibility — required */
    dummy: string;
    /** The addresses and amounts — required */
    amounts: JSON;
    /** Ignored dummy value — defaults to `optional` */
    minconf?: number;
    /** A comment — defaults to `optional` */
    comment?: string;
    /** The addresses — defaults to `optional` */
    subtractfeefrom?: JSON;
    /** Allow this transaction to be replaced by a transaction with higher fees via BIP 125 — defaults to `default` */
    replaceable?: boolean;
    /** Confirmation target in blocks — defaults to `-txconfirmtarget` */
    conf_target?: number;
    /** The fee estimate mode must be one of (case insensitive): — defaults to `unset` */
    estimate_mode?: string;
    /** Specify a fee rate in sat/vB — defaults to `estimation` */
    fee_rate?: number;
    /** If true return extra infomration about the transaction — defaults to `false` */
    verbose?: boolean;
  }) => Promise<any>;
  /** Submit a raw transaction (serialized, hex-encoded) to local node and network. https://developer.bitcoin.org/reference/rpc/sendrawtransaction.html */
  sendrawtransaction: ({
    hexstring,
    maxfeerate,
  }?: {
    /** The hex string of the raw transaction — required */
    hexstring: string;
    /** Reject transactions whose fee rate is higher than the specified value expressed in BTC/kB — defaults to `0.10` */
    maxfeerate?: number;
  }) => Promise<any>;
  /** Send an amount to a given address. Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted. https://developer.bitcoin.org/reference/rpc/sendtoaddress.html */
  sendtoaddress: ({
    address,
    amount,
    comment,
    comment_to,
    subtractfeefromamount,
    replaceable,
    conf_target,
    estimate_mode,
    avoid_reuse,
    fee_rate,
    verbose,
  }?: {
    /** The bitcoin address to send to — required */
    address: string;
    /** The amount in BTC to send. eg 0.1 — required */
    amount: number;
    /** A comment used to store what the transaction is for — defaults to `optional` */
    comment?: string;
    /** A comment to store the name of the person or organization — defaults to `optional` */
    comment_to?: string;
    /** The fee will be deducted from the amount being sent — defaults to `false` */
    subtractfeefromamount?: boolean;
    /** Allow this transaction to be replaced by a transaction with higher fees via BIP 125 — defaults to `default` */
    replaceable?: boolean;
    /** Confirmation target in blocks — defaults to `-txconfirmtarget` */
    conf_target?: number;
    /** The fee estimate mode must be one of (case insensitive): — defaults to `unset` */
    estimate_mode?: string;
    /** (only available if avoid_reuse wallet flag is set) Avoid spending from dirty addresses; addresses are considered — defaults to `true` */
    avoid_reuse?: boolean;
    /** Specify a fee rate in sat/vB — defaults to `estimation` */
    fee_rate?: number;
    /** If true return extra information about the transaction — defaults to `false` */
    verbose?: boolean;
  }) => Promise<any>;
  /** Attempts to add or remove an IP/Subnet from the banned list. https://developer.bitcoin.org/reference/rpc/setban.html */
  setban: ({
    subnet,
    command,
    bantime,
    absolute,
  }?: {
    /** The IP/Subnet (see getpeerinfo for nodes IP) with an optional netmask (default is /32 = single IP) — required */
    subnet: string;
    /** 'add' to add an IP/Subnet to the list 'remove' to remove an IP/Subnet from the list — required */
    command: string;
    /** time in seconds how long (or until when if [absolute] is set) the IP is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument) — defaults to `0` */
    bantime?: number;
    /** If set the bantime must be an absolute timestamp expressed in UNIX epoch time — defaults to `false` */
    absolute?: boolean;
  }) => Promise<any>;
  /** Set or generate a new HD wallet seed. Non-HD wallets will not be upgraded to being a HD wallet. Wallets that are already. HD will have a new HD seed set so that new keys added to the keypool will be derived from this new seed. https://developer.bitcoin.org/reference/rpc/sethdseed.html */
  sethdseed: ({
    newkeypool,
    seed,
  }?: {
    /** Whether to flush old unused addresses including change addresses from the keypool and regenerate it — defaults to `true` */
    newkeypool?: boolean;
    /** The WIF private key to use as the new HD seed — defaults to `seed` */
    seed?: string;
  }) => Promise<any>;
  /** Sets the label associated with the given address. https://developer.bitcoin.org/reference/rpc/setlabel.html */
  setlabel: ({
    address,
    label,
  }: {
    /** The bitcoin address to be associated with a label — required */
    address: string;
    /** The label to assign to the address — required */
    label: string;
  }) => Promise<any>;
  /** Disable/enable all p2p network activity. https://developer.bitcoin.org/reference/rpc/setnetworkactive.html */
  setnetworkactive: ({
    state,
  }: {
    /** true to enable networking false to disable — required */
    state: boolean;
  }) => Promise<any>;
  /** Set the transaction fee per kB for this wallet. Overrides the global -paytxfee command line parameter. Can be deactivated by passing 0 as the fee. In that case automatic fee selection will be used by default. https://developer.bitcoin.org/reference/rpc/settxfee.html */
  settxfee: ({
    amount,
  }: {
    /** The transaction fee in BTC/kvB — required */
    amount: number;
  }) => Promise<any>;
  /** Change the state of the given wallet flag for a wallet. https://developer.bitcoin.org/reference/rpc/setwalletflag.html */
  setwalletflag: ({
    flag,
    value,
  }?: {
    /** The name of the flag to change. Current available flags: avoid_reuse — required */
    flag: string;
    /** The new state — defaults to `true` */
    value?: boolean;
  }) => Promise<any>;
  /** Sign a message with the private key of an address. Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted. https://developer.bitcoin.org/reference/rpc/signmessage.html */
  signmessage: ({
    address,
    message,
  }: {
    /** The bitcoin address to use for the private key — required */
    address: string;
    /** The message to create a signature of — required */
    message: string;
  }) => Promise<any>;
  /** Sign a message with the private key of an address. https://developer.bitcoin.org/reference/rpc/signmessagewithprivkey.html */
  signmessagewithprivkey: ({
    privkey,
    message,
  }: {
    /** The private key to sign the message with — required */
    privkey: string;
    /** The message to create a signature of — required */
    message: string;
  }) => Promise<any>;
  /** Sign inputs for raw transaction (serialized, hex-encoded). The second argument is an array of base58-encoded private. keys that will be the only keys used to sign the transaction. The third optional argument (may be null) is an array of previous transaction outputs that. this transaction depends on but may not yet be in the block chain. https://developer.bitcoin.org/reference/rpc/signrawtransactionwithkey.html */
  signrawtransactionwithkey: ({
    hexstring,
    privkeys,
    prevtxs,
    sighashtype,
  }?: {
    /** The transaction hex string — required */
    hexstring: string;
    /** The base58-encoded private keys for signing — required */
    privkeys: JSON;
    /** The previous dependent transaction outputs — defaults to `optional` */
    prevtxs?: JSON;
    /** The signature hash type. Must be one of: — defaults to `ALL` */
    sighashtype?: string;
  }) => Promise<any>;
  /** Sign inputs for raw transaction (serialized, hex-encoded). The second optional argument (may be null) is an array of previous transaction outputs that. this transaction depends on but may not yet be in the block chain. Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted. https://developer.bitcoin.org/reference/rpc/signrawtransactionwithwallet.html */
  signrawtransactionwithwallet: ({
    hexstring,
    prevtxs,
    sighashtype,
  }?: {
    /** The transaction hex string — required */
    hexstring: string;
    /** The previous dependent transaction outputs — defaults to `optional` */
    prevtxs?: JSON;
    /** The signature hash type. Must be one of — defaults to `ALL` */
    sighashtype?: string;
  }) => Promise<any>;
  /**  https://developer.bitcoin.org/reference/rpc/stop.html */
  stop: () => Promise<any>;
  /** Attempts to submit new block to network. See https://en.bitcoin.it/wiki/BIP_0022 for full specification. https://developer.bitcoin.org/reference/rpc/submitblock.html */
  submitblock: ({
    hexdata,
    dummy,
  }?: {
    /** the hex-encoded block data to submit — required */
    hexdata: string;
    /** dummy value for compatibility with BIP22. This value is ignored — defaults to `ignored` */
    dummy?: string;
  }) => Promise<any>;
  /** Decode the given hexdata as a header and submit it as a candidate chain tip if valid. Throws when the header is invalid. https://developer.bitcoin.org/reference/rpc/submitheader.html */
  submitheader: ({
    hexdata,
  }: {
    /** the hex-encoded block header data — required */
    hexdata: string;
  }) => Promise<any>;
  /** Returns result of mempool acceptance tests indicating if raw transaction (serialized, hex-encoded) would be accepted by mempool. https://developer.bitcoin.org/reference/rpc/testmempoolaccept.html */
  testmempoolaccept: ({
    rawtxs,
    maxfeerate,
  }?: {
    /** An array of hex strings of raw transactions — required */
    rawtxs: JSON;
    /** Reject transactions whose fee rate is higher than the specified value expressed in BTC/kB — defaults to `0.10` */
    maxfeerate?: number;
  }) => Promise<any>;
  /** Result:. {                       (json object).   "warning" : "str"     (string) Warning message if wallet was not unloaded cleanly. }. https://developer.bitcoin.org/reference/rpc/unloadwallet.html */
  unloadwallet: ({
    wallet_name,
    load_on_startup,
  }?: {
    /** The name of the wallet to unload. Must be provided in the RPC endpoint or this parameter (but not both) — defaults to `endpoint` */
    wallet_name?: string;
    /** Save wallet name to persistent settings and load on startup. True to add wallet to startup list false to remove null to leave unchanged — defaults to `null` */
    load_on_startup?: boolean;
  }) => Promise<any>;
  /** Upgrade the wallet. Upgrades to the latest version if no version number is specified. New keys may be generated and a new wallet backup will need to be made. Arguments:. 1. version    (numeric, optional, default=169900) The version number to upgrade to. Default is the latest wallet version. https://developer.bitcoin.org/reference/rpc/upgradewallet.html */
  upgradewallet: ({
    version,
  }?: {
    /** The version number to upgrade to. Default is the latest wallet version — defaults to `169900` */
    version?: number;
  }) => Promise<any>;
  /** Returns the total uptime of the server. https://developer.bitcoin.org/reference/rpc/uptime.html */
  uptime: () => Promise<any>;
  /** Updates all segwit inputs and outputs in a PSBT with data from output descriptors, the UTXO set or the mempool. https://developer.bitcoin.org/reference/rpc/utxoupdatepsbt.html */
  utxoupdatepsbt: ({
    psbt,
    descriptors,
  }?: {
    /** A base64 string of a PSBT — required */
    psbt: string;
    /** An array of either strings or objects — defaults to `optional` */
    descriptors?: JSON;
  }) => Promise<any>;
  /** Return information about the given bitcoin address. https://developer.bitcoin.org/reference/rpc/validateaddress.html */
  validateaddress: ({
    address,
  }: {
    /** The bitcoin address to validate — required */
    address: string;
  }) => Promise<any>;
  /** Verifies blockchain database. https://developer.bitcoin.org/reference/rpc/verifychain.html */
  verifychain: ({
    checklevel,
    nblocks,
  }?: {
    /** How thorough the block verification is: — defaults to `range=0-4` */
    checklevel?: number;
    /** The number of blocks to check — defaults to `0=all` */
    nblocks?: number;
  }) => Promise<any>;
  /** Verify a signed message. https://developer.bitcoin.org/reference/rpc/verifymessage.html */
  verifymessage: ({
    address,
    signature,
    message,
  }: {
    /** The bitcoin address to use for the signature — required */
    address: string;
    /** The signature provided by the signer in base 64 encoding (see signmessage) — required */
    signature: string;
    /** The message that was signed — required */
    message: string;
  }) => Promise<any>;
  /** Verifies that a proof points to a transaction in a block, returning the transaction it commits to. and throwing an RPC error if the block is not in our best chain. https://developer.bitcoin.org/reference/rpc/verifytxoutproof.html */
  verifytxoutproof: ({
    proof,
  }: {
    /** The hex-encoded proof generated by gettxoutproof — required */
    proof: string;
  }) => Promise<any>;
  /** Creates and funds a transaction in the Partially Signed Transaction format. Implements the Creator and Updater roles. https://developer.bitcoin.org/reference/rpc/walletcreatefundedpsbt.html */
  walletcreatefundedpsbt: ({
    inputs,
    outputs,
    locktime,
    options,
  }?: {
    /** Leave empty to add inputs automatically. See add_inputs option — defaults to `optional` */
    inputs?: JSON;
    /** The outputs (key-value pairs) where none of the keys are duplicated — required */
    outputs: JSON;
    /** Raw locktime. Non-0 value also locktime-activates inputs — defaults to `0` */
    locktime?: number;
    /** defaults to `optional` */
    options?: JSON;
  }) => Promise<any>;
  /** Removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call walletpassphrase again. before being able to call any methods which require the wallet to be unlocked. https://developer.bitcoin.org/reference/rpc/walletlock.html */
  walletlock: () => Promise<any>;
  /** Stores the wallet decryption key in memory for 'timeout' seconds. This is needed prior to performing transactions related to private keys such as sending bitcoins. https://developer.bitcoin.org/reference/rpc/walletpassphrase.html */
  walletpassphrase: ({
    passphrase,
    timeout,
  }: {
    /** The wallet passphrase — required */
    passphrase: string;
    /** The time to keep the decryption key in seconds; capped at 100000000 (~3 years) — required */
    timeout: number;
  }) => Promise<any>;
  /** Changes the wallet passphrase from 'oldpassphrase' to 'newpassphrase'. https://developer.bitcoin.org/reference/rpc/walletpassphrasechange.html */
  walletpassphrasechange: ({
    oldpassphrase,
    newpassphrase,
  }: {
    /** The current passphrase — required */
    oldpassphrase: string;
    /** The new passphrase — required */
    newpassphrase: string;
  }) => Promise<any>;
  /** Update a PSBT with input information from our wallet and then sign inputs. that we can sign for. Requires wallet passphrase to be set with walletpassphrase call if wallet is encrypted. https://developer.bitcoin.org/reference/rpc/walletprocesspsbt.html */
  walletprocesspsbt: ({
    psbt,
    sign,
    sighashtype,
  }?: {
    /** The transaction base64 string — required */
    psbt: string;
    /** Also sign the transaction when updating — defaults to `true` */
    sign?: boolean;
    /** The signature hash type to sign with if not specified by the PSBT. Must be one of — defaults to `ALL` */
    sighashtype?: string;
  }) => Promise<any>;
}
