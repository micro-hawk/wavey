const { expect } = require("chai");

describe("WavePortal", function () {
  it("should increase totalWaves count when waved", async function () {
    const WavePortal = await ethers.getContractFactory("WavePortal");
    const wavePortal = await WavePortal.deploy();

    await wavePortal.wave("Hello, world!");

    const totalWaves = await wavePortal.totalWaves();
    expect(totalWaves).to.equal(1);
  });

  it("should emit NewWave event when waved", async function () {
    const WavePortal = await ethers.getContractFactory("WavePortal");
    const wavePortal = await WavePortal.deploy();

    const tx = await wavePortal.wave("Hello, world!");

    const receipt = await tx.wait(1);
    const events = receipt.events.filter((event) => event.event === "NewWave");
    expect(events.length).to.equal(1);
    expect(events[0].args.sender).to.equal(await ethers.provider.getSigner().getAddress());
    expect(events[0].args.message).to.equal("Hello, world!");
  });
});
