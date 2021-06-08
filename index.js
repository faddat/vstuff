//This entire program:
// Checks vsys and vusdt balances once every two seconds as part of its main loop.  For tokens it is actually an array of token contract ID's to be checked once every two seconds.
// Creates deposit addressdes on the V Systems chain
// Is currently limited to one token type but is easily extensible
// Can be automatically tested


const vsys = require("@virtualeconomy/js-v-sdk");
const constants = vsys.constants;
var acc = new vsys.Account(constants.TESTNET_BYTE);
var chain = new vsys.Blockchain(node_address, network_byte);



var mnemonic = "boy inner imitate addict patient behave spirit issue give image hard version lady blush phone"

// derive address from mnemonic
function deriveAddress(increment=0) {
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
getTokenBalance(chain, "<address>", "<token_id>");

while(true){
  getBalance(chain, "<address>");
  await new Promise(r => setTimeout(r, 2000));
}


// ** This function sends tokens to some destination address, on demand **
// attachment set to nil,it  is the third parameter after amount
function sendToken(acc, tokenId, tokenUnity, destinationAddress, amount, " ") {
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
function issueToken(acc, tokenId, tokenUnity, amount, " ") {
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
function destroyToken(acc, tokenId, tokenUnity, amount, " ") {
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