const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const RockPaperScissors = await hre.ethers.getContractFactory("RockPaperScissors"); 
  const rps = await RockPaperScissors.deploy();

  console.log("RockPaperScissors contract deployed to:", rps.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contracts:", error);
    process.exit(1);
  });
