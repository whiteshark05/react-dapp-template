require('dotenv').config()
var HDWalletProvider = require("truffle-hdwallet-provider");

// Only for testing...not actual production values
var mnemonic = process.env.local.MNEMONIC;

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/hoaFrziApKtGNChupjGp");
      },
      network_id: '3',
      gas: 2900000,
      // Set gas price
      from: '0x823eda0e2414a90f00489be8065bbb11d93f6972'
    },
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://localhost:7545/", 0, 10);
      },
      network_id: '*',
      gas: 3999999
    }
  }
};