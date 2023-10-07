const { ethers } = require("hardhat")
const { expect } = require("chai");

describe("RockPaperScissors", function () {
  it("Should allow players to register", async function () {
    const [player1, player2] = await ethers.getSigners();

    const RockPaperScissors = await ethers.getContractFactory("RockPaperScissors");
    const rps = await RockPaperScissors.deploy();

    

    await rps.connect(player1).register({ value: ethers.parseEther("0.0001") });
    await rps.connect(player2).register({ value: ethers.parseEther("0.0001") });

    const player1Address = await rps.player1();
    const player2Address = await rps.player2();

    expect(player1Address).to.equal(player1.address);
    expect(player2Address).to.equal(player2.address);
  });


});
