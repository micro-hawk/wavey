require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

API_URL=`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "infura",
  networks: {
    hardhat:{},
    infura:{
      url: API_URL,
      accounts: [`0x${process.env.SIGNER_PRIVATE_KEY}`]
    }
  },
  allowUnlimitedContractSize: true
};
