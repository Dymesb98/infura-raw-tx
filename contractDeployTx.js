const ethers = require('ethers');
const credentials = require('./credentials/credentials.js');
const build = require('./build/contracts/Ballot.json');

let provider = new ethers.providers.InfuraProvider("kovan", credentials.INFURA_API_KEY);

let wallet = new ethers.Wallet(credentials.P_KEY, provider);

let abi = build.abi;

let bytecode = build.bytecode;

(async function() {

  //Data = bytecode+params
  let params = '0000000000000000000000000000000000000000000000000000000000000001';
  let data = bytecode + params;

  const gasPrice = ethers.utils.bigNumberify('1000000000');
  const gasLimit = ethers.utils.bigNumberify('633355');

  const nonce = await wallet.getTransactionCount('pending');

  const tx = {
    to : null,
    nonce,
    gasPrice,
    gasLimit,
    data
  }

  console.log(tx);

  const raw = await wallet.sign(tx);

  console.log("raw transaction: \n");
  console.log(raw);

    // // Create an instance of a Contract Factory
    // let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    // console.log(factory);

    // const unsignedTx = factory.getDeployed(1, {gasLimit:, gasPrice: })
    //
    // // Notice we pass in "Hello World" as the parameter to the constructor
    // let contract = await factory.deploy("1");
    // console.log(contract.deployTransaction);
    //
    // // The address the Contract WILL have once mined
    // console.log(contract.address);
    //
    // // The transaction that was sent to the network to deploy the Contract
    // console.log(contract.deployTransaction.hash);
    //
    // // The contract is NOT deployed yet; we must wait until it is mined
    // await contract.deployed()

    // Done! The contract is deployed.
})();
