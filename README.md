# Project Wavey

This is a sample project for building a smart contract on the Ethereum network using the Solidity programming language. The smart contract allows users to send waves to the contract and keeps track of the total number of waves sent. The contract also stores the wave messages from users in arrays using structs.

## Technologies Used

- Solidity
- Hardhat (for local testing and deployment)
- Metamask (for interacting with the contract on the Ethereum network)

## Getting Started

To run this project on your local machine, follow these steps:

1. Clone the repository to your local machine.
```shell
git clone https://github.com/micro-hawk/wavey.git
```

2. Install the dependencies by running `npm install`.
```shell
cd wavey
npm install
```

3. Update the `hardhat.config.js` file to use your preferred local network configuration.

4. Run `npx hardhat compile` to compile the smart contract.
```shell
npm hardhat compile
```

5. Run `npx hardhat test` to run the test suite.

6. Deploy the smart contract to a testnet or the Ethereum mainnet using `npx hardhat run wave.js --network <network-name>`.
```shell
npx hardhat run wave.js --network rinkeby
```

7. Connect Metamask to the network where the contract is deployed.

8. Use the web app to interact with the deployed contract and send waves to the contract.

## Resources

- Solidity Documentation: https://docs.soliditylang.org/en/v0.8.11/
- Hardhat Documentation: https://hardhat.org/getting-started/
- Metamask Documentation: https://docs.metamask.io/

## Contributors

- Vikas Das (microhawkx@gmail.com)
