var Web3 = require('web3');
var web3 = window.web3;

let configs = {
    localhost: {
        url: 'http://localhost:7545',
        address: '0xadf15576b70b7fde0a584acd590e0d49b2c9ffc3'
    },
    ropsten: {
        url: 'https://ropsten.infura.io/hoaFrziApKtGNChupjGp',
        address: '0x7dDA60e806cED3Bf0e56aFE89b1A398aE5087780'
    },
    mainnet: {
        url: '',
        address: ''
    }
}

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("Got web3")
    //console.log(web3)
  } else {
    // Set the provider you want from Web3.providers
    console.log("No web3")
    web3 = new Web3(new Web3.providers.HttpProvider(configs.ropsten.url));
}

//web3.currentProvider.publicConfigStore.on('update', getAccount().then(console.log));


//web3.eth.getAccounts().then(console.log)
//let json = require('C:/Users/Thinh/Solidity/dapp-boiler-plate/truffle/build/contracts/MessageBoard.json')
let abi = require('./abi.json');


let contractInstance = new web3.eth.Contract(abi, configs.ropsten.address) 
contractInstance.options.from = '0x823eda0e2414a90f00489be8065bbb11d93f6972'; // default from address
contractInstance.options.gasPrice = '2000000000'; // default gas price in wei
//contractInstance.options.gas = 200000; // provide as fallback always 5M gas


export const setProfile = async (_name, _age) => {
    let accounts = await web3.eth.getAccounts()
    return contractInstance.methods.setProfile(_name, _age).send({from:accounts[0]})
}


export const getUser = async () => {
    let accounts = await web3.eth.getAccounts()
    try {
        let user = await contractInstance.methods.getUser().call({from:accounts[0]})
        return user;
    }
    catch (error){
        console.error(error);
    }
    
}


export const postMessage = async (_title, _content) => {
    let accounts = await web3.eth.getAccounts()
    try {
        contractInstance.methods.postMessage(_title, _content).send({from:accounts[0], gas: 200000})
    }
    catch (error){
        console.error(error);
    }
}


export const getMessage = async () => {
    let accounts = await web3.eth.getAccounts()
    return contractInstance.methods.getMessage().call({from:accounts[0]})
}


export const getAllMessage = async () => {
    return contractInstance.methods.getAllMessage().call()
}

export const getAccount = async () => {
    let accounts = await web3.eth.getAccounts()
    return accounts[0];
}


// // Load contract Application Binary Interface  
// initializeWeb3(abi, configs.localhost);


// function initializeWeb3(abi, config) {

//     let web3 = new Web3(new Web3.providers.HttpProvider(configs.localhost.url));
//     web3.eth.defaultAccount = web3.eth.accounts[0];
//     //console.log(feature);

//     let filter = web3.eth.filter('latest');
//     filter.watch(function (error, result) {
//         var block = web3.eth.getBlock(result, true);
//         //console.log('block #' + block.number);
//         //console.dir(block.transactions);
//     });

// }