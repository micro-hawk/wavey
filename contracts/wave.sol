// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WavePortal {
  uint256 public totalWaves;
  
  struct Wave {
    address sender;
    string message;
  }
  
  Wave[] waves;
  
  event NewWave(address indexed sender, string message);
  
  function wave(string memory message) public {
    totalWaves++;
    waves.push(Wave(msg.sender, message));
    emit NewWave(msg.sender, message);
  }
  
  function getWaves() public view returns (Wave[] memory) {
    return waves;
  }
}
