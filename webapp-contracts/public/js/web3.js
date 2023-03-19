const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "NewWave",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getWaves",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          }
        ],
        "internalType": "struct WavePortal.Wave[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalWaves",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "wave",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const CONTRACT_ADDRESS = "XXXXX"

let web3;
let contract;

const statusButton = document.getElementById("status");
statusButton.addEventListener('click', connectMetamask);


async function connectMetamask() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
      alert("Connected to metamask")
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
