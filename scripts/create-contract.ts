import { ethers } from "hardhat";
const createContract = async () => {
  const weth_f = await ethers.getContractFactory("WETH9");
  const weth = await weth_f.deploy().then((tx) => tx.waitForDeployment());
  console.log("WETH deployed to:", await weth.getAddress());
  const lock_f = await ethers.getContractFactory("LockWETH");
  const lock = await lock_f
    .deploy(await weth.getAddress())
    .then((tx) => tx.waitForDeployment());

  console.log("Lock deployed to:", await lock.getAddress());
};
createContract();
// WETH deploy transaction:"https://sepolia.etherscan.io/tx/0x901ab569b4cb310aca69861f816e108728b9287b4af400c29e81c758afc0fdc4"
// LockWETH deploy transaction:"https://sepolia.etherscan.io/tx/0x18740db47acbc8f5edf70b179dd0b44f12d6e0eb4d6c34589be4c6a5c3dc37e7"
