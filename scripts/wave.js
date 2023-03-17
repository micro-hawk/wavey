const { ethers } = require("hardhat");
require('dotenv').config();

// async function main() {
//   const network = process.env.ETHEREUM_NETWORK;
//   const WavePortal = await ethers.getContractFactory("WavePortal");
//   const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/424630d0854440eebd3b196359b6d087");
//   const signer = new ethers.Wallet("392ba76e786d4670b5b9a15e8b84bcc0", provider);
//   const wavePortal = await WavePortal.connect(signer).deploy();

//   console.log("WavePortal deployed to:", wavePortal.address);
// }


async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.providers.InfuraProvider(
    network,
    process.env.INFURA_API_KEY
  );
  // Creating a signing account from a private key
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);
  const WavePortal = await ethers.getContractFactory("WavePortal");
  const wavePortal = await WavePortal.connect(signer).deploy();
  console.log("WavePortal deployed to:", wavePortal.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
