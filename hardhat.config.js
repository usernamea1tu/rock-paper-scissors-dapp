require("@nomicfoundation/hardhat-toolbox");

const { API_URL, PRIVATE_KEY } = require('./secrets.json'); // Create a secrets.json file to store your API key and private key
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    bscTestnet: {
      url: API_URL, // Replace with the BSC testnet URL
      chainId: 97, // Replace with the correct chain ID for BSC testnet (97 for Testnet, 56 for Mainnet)
      accounts: [`${PRIVATE_KEY}`], // Replace with your deployment account's private key
    },
  },
  solidity: "0.8.19",
};
