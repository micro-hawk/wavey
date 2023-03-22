const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "NewWave",
    type: "event",
  },
  {
    inputs: [],
    name: "getWaves",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
        ],
        internalType: "struct WavePortal.Wave[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalWaves",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "wave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "XXX";

let web3;
let contract;

const waveButton = document.getElementById("wave-btn");
waveButton.addEventListener("click", wave);

async function connectMetamask() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
      console.log("Connected to Metamask");
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Metamask not detected");
    console.error("Metamask not detected");
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
  document.querySelector(".loader").style.display = "block";
  await contract.methods.wave(message).send({ from: sender });

  console.log("Waved:", message);
  document.querySelector(".loader").style.display = "none";
  setTimeout(function () {
    alert(`Waved: ${message}`);
  }, 1500);
  waveMessage.value = "";
}

const totalWaves = document.getElementById("total-wave-btn");
totalWaves.addEventListener("click", getWaves);

async function getWaves() {
  web3 = new Web3(window.ethereum);
  contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
  const waves = await contract.methods.getWaves().call();
  console.log("Waves:", waves);
  const totalWavesCount = waves.length;
  showTotalCount(totalWavesCount);
  createWaveCards(waves);
}

function showTotalCount(totalCountWaves) {
  const section = document.getElementById("total-count-section");
  const content = `
  <h1
  style="
    text-align: center;
    color: #3cbbe2;
    font-family: 'Roboto', sans-serif;
  "
>
  Total Waves: ${totalCountWaves}
</h1>
  `;
  section.innerHTML = content;
  section.style.display = "block";
}

function createWaveCards(waves) {
  const wrapper = document.getElementById("wrapper");
  let html = "";
  waves.forEach((element) => {
    const content = `
    <div
    class="card"
    style="
      max-width: 500px;
      min-height: 100px;
      background: #f1f1f1;
      padding: 30px;
      box-sizing: border-box;
      color: #000;
      margin: 20px;
      box-shadow: 0px 2px 18px -4px rgba(0, 0, 0, 0.75);
    "
  >
    <h3
      class="card-title"
      style="
        margin-top: 0;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 1.2px;
      "
    >
      ${element.sender}
    </h3>
    <p
      class="card-content"
      style="font-size: 14px; letter-spacing: 0.5px; line-height: 1.5"
    >
      <span style="font-weight: bold">Message: </span> ${element.message}
    </p>
  </div>
    `;
    html += content;
  });
  wrapper.innerHTML = html;
}
