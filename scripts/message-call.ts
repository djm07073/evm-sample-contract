import { ethers } from "hardhat";
import { LockWETH } from "../typechain-types";
const WETH = "0x68b62b199158bDc2E89f80F47f9a9b9dc0f9E523";
const LOCKWETH = "0x19071226e61Ca3dEeA04140326e3b5bCB23fc6A5";
const BOB = "0x31D613CBa3d5200b1C82C13e0ff09661A59c08B8";
const type1 = async () => {
  // 다른 주소(BOB)로 0.1 ETH 전송하는 트랜잭션
  const signers = await ethers.getSigners();
  await signers[0]
    .sendTransaction({
      to: BOB,
      value: ethers.parseEther("0.1"),
    })
    .then((tx) => tx.wait())
    .then((receipt) => console.log("Type 1 Transaction Receipt:", receipt));
};
const type2 = async () => {
  //Alice가 0.2ETH를 deposit해서 0.2 WETH얻기
  const weth = await ethers.getContractAt("WETH9", WETH);
  weth
    .deposit({ value: ethers.parseEther("0.2") })
    .then((tx) => tx.wait())
    .then((receipt) => console.log("Type 2 Transaction Receipt:", receipt));
};

const type3 = async () => {
  // Alice가 LockWETH Contract의 take function을 통해 LockWETH Contract로 0.1 WETH 이동
  const lock: LockWETH = await ethers.getContractAt("LockWETH", LOCKWETH);
  const weth = await ethers.getContractAt("WETH9", WETH);
  await weth.approve(LOCKWETH, ethers.parseEther("0.1"));
  await lock
    .lock(ethers.parseEther("0.1"))
    .then((tx) => tx.wait())
    .then((receipt) => console.log("Type 3 Transaction Receipt:", receipt));
};
const type4 = async () => {
  // WETH Contract에서 ETH withdraw
  const weth = await ethers.getContractAt("WETH9", WETH);
  await weth
    .withdraw(ethers.parseEther("0.1"))
    .then((tx) => tx.wait())
    .then((receipt) => console.log("Type 4 Transaction Receipt:", receipt));
};
// type1();
// https://sepolia.etherscan.io/tx/0x5e3650924a27ab2471419d3ebcd7254374140b1680fcd74ab9d1fc08350f7603

// type2();
// https://sepolia.etherscan.io/tx/0xafde9711ec213331dec1470656e71de7e71cf71a97035e6ea127e4d705b919e0

// type3();
// https://sepolia.etherscan.io/tx/0xf091b30ebcc32ba0d315d18652523ad22b167bf87ab67407b40bae860834005b

// type4();
// https://sepolia.etherscan.io/tx/0x754b137ddfc0542bc099f1f10b06c16fab75af9c2f9c5d1840c4984e9941db8c
