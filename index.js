//This entire program:
// Checks vsys and vusdt balances once every two seconds as part of its main loop.  For tokens it is actually an array of token contract ID's to be checked once every two seconds.
// Creates deposit addressdes on the V Systems chain
// Is currently limited to one token type but is easily extensible
// Can be automatically tested


const vsys = require("@virtualeconomy/js-v-sdk");
const bs58 = require("bs58")
const constants = vsys.constants;
const node_address = "https://test.v.systems/api"; 
const network_byte = constants.TESTNET_BYTE;
var acc = new vsys.Account(constants.TESTNET_BYTE);
var chain = new vsys.Blockchain(node_address, network_byte);
var tra = new vsys.Transaction(network_byte);

var mnemonic = "boy inner imitate addict patient behave spirit issue give image hard version lady blush phone"



// derive address from mnemonic
function deriveAddress(mnemonic, increment=0) {
    acc.buildFromSeed(mnemonic, increment);
    console.log(acc.getAddress());
}

async function getBalance(chain, address) {
    let result = await chain.getBalance(address);
    console.log(result);
}

async function sendExecuteContractTx(tx) {
    const result = await chain.sendExecuteContractTx(tx);
    console.log(result);
}

// Get address's token balance
async function getTokenBalance(chain, address, token_id) {
    const result = await chain.getTokenBalance(address, token_id);
    console.log(result);
}


getTokenBalance(chain, "AU3FUbJ1TVwBKKxTtx3nZTWs2Z6pb4Cy5Sy", "TWurgotttEasCE9Fc823EzP4hd5YbRVGapMeEBdxZ");

deriveAddress(mnemonic, 0)



// 1623184567869000000
// 6942069420694206942


let timestamp = 6942069420694206942;
console.log(timestamp)


async function sendPaymentTx(tx) {
    // const result = await chain.sendPaymentTx(tx);
    const result = await acc.sendTransaction(chain, tx);
    console.log(result);
}

// Create Transaction Object
let public_key = acc.getPublicKey();
tra.buildPaymentTx(public_key, "AU3FUbJ1TVwBKKxTtx3nZTWs2Z6pb4Cy5Sy", "1000000", bs58.encode(Buffer.from("hi")))

// Get bytes
let bytes = tra.toBytes();

// Get signature
let signature = acc.getSignature(bytes);



// Get json for sending tx
let send_tx = tra.toJsonForSendingTx(signature);

console.log(send_tx)

// Send transaction
sendPaymentTx(send_tx);


for(;;){
setTimeout(() => { getBalance(chain, "AU3FUbJ1TVwBKKxTtx3nZTWs2Z6pb4Cy5Sy"); }, 2000);
}  






// ** This function sends tokens to some destination address, on demand **
// attachment set to nil,it  is the third parameter after amount

attachment = " "


function sendToken(acc, tokenId, tokenUnity, destinationAddress, amount, attachment){
  let data_generator = new vsys.TokenContractDataGenerator();
  let public_key = acc.getPublicKey();
  let timestamp = Date.now() * 1e6;
  let function_data = data_generator.createSendData(destinationAddress, amount, tokenUnity);
  let function_index = vsys.getContractFunctionIndex(vsys.ContractType.TOKEN, 'SEND');

  // Build contract tx
  tra.buildExecuteContractTx(public_key, "<contract_id>", function_index, function_data, timestamp, attachment);

  // Get bytes
  let bytes = tra.toBytes();

  // Get signature
  let signature = acc.getSignature(bytes);

  // Get json for sending tx
  let send_tx = tra.toJsonForSendingTx(signature);

  // Send transaction
  sendExecuteContractTx(send_tx);

}

// ** This function issues new tokens in the contract, on demand **
// attachment set to nil,it  is the third parameter after amount
function issueToken(acc, tokenId, tokenUnity, amount, attachment) {
  let data_generator = new vsys.TokenContractDataGenerator();
  let public_key = acc.getPublicKey();
  let timestamp = Date.now() * 1e6;
  let function_data = data_generator.createSendData(destinationAddress, amount, tokenUnity);
  let function_index = vsys.getContractFunctionIndex(vsys.ContractType.TOKEN, 'ISSUE');

  // Build contract tx
  tra.buildExecuteContractTx(public_key, "<contract_id>", function_index, function_data, timestamp, attachment);

  // Get bytes
  let bytes = tra.toBytes();

  // Get signature
  let signature = acc.getSignature(bytes);

  // Get json for sending tx
  let send_tx = tra.toJsonForSendingTx(signature);

  // Send transaction
  sendExecuteContractTx(send_tx);

}

// ** This function destoyes tokens in the contract, on demand **
// attachment set to nil,it  is the third parameter after amount
function destroyToken(acc, tokenId, tokenUnity, amount, attachment) {
  let data_generator = new vsys.TokenContractDataGenerator();
  let public_key = acc.getPublicKey();
  let timestamp = Date.now() * 1e6;
  let function_data = data_generator.createSendData(destinationAddress, amount, tokenUnity);
  let function_index = vsys.getContractFunctionIndex(vsys.ContractType.TOKEN, 'DESTROY');

  // Build contract tx
  tra.buildExecuteContractTx(public_key, "<contract_id>", function_index, function_data, timestamp, attachment);

  // Get bytes
  let bytes = tra.toBytes();

  // Get signature
  let signature = acc.getSignature(bytes);

  // Get json for sending tx
  let send_tx = tra.toJsonForSendingTx(signature);

  // Send transaction
  sendExecuteContractTx(send_tx);

}


