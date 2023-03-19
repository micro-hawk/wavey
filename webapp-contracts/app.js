const Web3 = require('web3');
const dotenv = require('dotenv');
const contractABI = require('./WavePortal.json');

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

let web3;
let contract;

async function connectMetamask() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
      console.log('Connected to Metamask');
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error('Metamask not detected');
  }
}

async function wave() {
  const message = prompt('Enter a message:');
  if (message === null) return;

  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];

  await contract.methods.wave(message).send({ from: sender });

  console.log('Waved:', message);
}

async function getWaves() {
  const waves = await contract.methods.getWaves().call();

  console.log('Waves:', waves);
}

connectMetamask();
