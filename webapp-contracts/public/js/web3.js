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


const CONTRACT_ADDRESS = "XXX"

let web3;
let contract;

const waveButton = document.getElementById("wave-btn");
waveButton.addEventListener('click', wave);

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
    alert("Metamask not detected")
    console.error('Metamask not detected');
  }
}
async function wave() {
  let waveMessage = document.getElementById("wave-message");
  const message = waveMessage.value;
  if (message.length == 0) return;
  web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];
  document.querySelector('.loader').style.display = 'block';
  await contract.methods.wave(message).send({ from: sender });
  
  console.log('Waved:', message);
  document.querySelector('.loader').style.display = 'none';
  setTimeout(function(){ alert(`Waved: ${message}`); }, 1500);
  waveMessage.value = '';
}

const totalWaves = document.getElementById("total-wave-btn");
totalWaves.addEventListener('click', getWaves);

async function getWaves() {
  web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
  const waves = await contract.methods.getWaves().call();
  console.log('Waves:', waves);
}
