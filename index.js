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
var account = acc.buildFromSeed(mnemonic, 0);
var address = acc.getAddress(); // will guive us: AU3FUbJ1TVwBKKxTtx3nZTWs2Z6pb4Cy5Sy at HD position 0


console.log("Address: ", address); 

var tokenId = "TWtbDuZE8cLMnGLqXp7jShkYdkJsEKV8L2cegxLHg"; // vUSDT

// derive address from mnemonic
function deriveAddress(mnemonic, increment=0) {
    acc.buildFromSeed(mnemonic, increment);
    console.log(acc.getAddress());
}

// get VSYS balance
async function getBalance(chain, address) {
    let result = await chain.getBalance(address);
    console.log(result);
}

async function sendExecuteContractTx(tx) {
    const result = await chain.sendExecuteContractTx(tx);
    console.log(result);
}

// send VSYS
async function sendPaymentTx(tx) {
    // const result = await chain.sendPaymentTx(tx);
    const result = await acc.sendTransaction(chain, tx);
    console.log("Payment sent:  ", result);
}

// Get address's token balance
async function getTokenBalance(chain, address, token_id) {
    const result = await chain.getTokenBalance(address, token_id);
    console.log("VUSDT BALANCE:  ", result);
}

// actually get the token balance
getTokenBalance(chain, address, tokenId);

// for(;;){
// setTimeout(() => { getBalance(chain, "AU3FUbJ1TVwBKKxTtx3nZTWs2Z6pb4Cy5Sy"); }, 2000);
// }  


function sendToken(acc, tokenId, tokenUnity, destinationAddress, amount, attachment){
  let data_generator = new vsys.TokenContractDataGenerator();
  //let public_key = acc.;
  let timestamp = Date.now() * 1e6;
  let function_data = data_generator.createSendData(destinationAddress, amount, tokenUnity);
  let function_index = vsys.getContractFunctionIndex(vsys.ContractType.TOKEN, 'SEND');

  // Build contract tx
  let transaction = tra.buildExecuteContractTx(public_key, tokenId, function_index, function_data, timestamp, attachment);

  // Get bytes
  let bytes = tra.toBytes(transaction);

  // Get signature
  let signature = acc.getSignature(bytes);

  // Get json for sending tx
  let send_tx = tra.toJsonForSendingTx(signature);

  // Send transaction
  let final = tra.sendExecuteContractTx(send_tx);

  console.log(final)

}

//let tokensend = sendToken("AU3FUbJ1TVwBKKxTtx3nZTWs2Z6pb4Cy5Sy", "7A8XSk34hZ5hm8mq6GfynMgxKX8AVK2uAkksV4xcFKxx", "1000000", "100",  bs58.encode(Buffer.from("hi")))  


// ** This function issues new tokens in the contract, on demand **
// attachment set to nil,it  is the third parameter after amount
function issueToken(account, tokenId, tokenUnity, amount, attachment) {
  let data_generator = new vsys.TokenContractDataGenerator();
  let public_key = acc.getPublicKey();
  let timestamp = Date.now() * 1e6;
  let function_data = data_generator.createIssueData(amount, tokenUnity);
  let function_index = vsys.getContractFunctionIndex(vsys.ContractType.TOKEN, 'ISSUE');

  // Build contract tx
  tra.buildExecuteContractTx(public_key, tokenId, function_index, function_data, timestamp, attachment);

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
function destroyToken(account, tokenId, tokenUnity, amount, attachment) {
  let data_generator = new vsys.TokenContractDataGenerator();
  let public_key = acc.getPublicKey();
  let timestamp = Date.now() * 1e6;
  let function_data = data_generator.createDestroyData(amount, tokenUnity);
  let function_index = vsys.getContractFunctionIndex(vsys.ContractType.TOKEN, 'DESTROY');

  // Build contract tx
   let transaction = tra.buildExecuteContractTx(public_key, tokenId, function_index, function_data, timestamp, attachment);

  // Get bytes
  let bytes = tra.toBytes();

  // Get signature
  let signature = acc.getSignature(bytes);

  // Get json for sending tx
  let send_tx = tra.toJsonForSendingTx(signature);

  // Send transaction
  sendExecuteContractTx(send_tx);

}


// get a Contract ID from the token ID
let contractId = vsys.default.Convert.tokenIDToContractID(tokenId)
// burn baby, burn
console.log(destroyToken(account, contractId, 1000000, 1))