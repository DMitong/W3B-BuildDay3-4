import { ethers } from "hardhat";

async function main() {
  const build3 = await ethers.deployContract("ColourBoard", []);
  await build3.waitForDeployment();
  console.log(`My Colour Grid is deployed to ${build3.target}`);

  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});