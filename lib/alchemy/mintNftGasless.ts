/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLightAccountAlchemyClient } from "@alchemy/aa-alchemy";
import { LocalAccountSigner } from "@alchemy/aa-core";
import { ethers } from "ethers";
import { erc721Abi } from "viem";
import { sepolia } from "viem/chains";

// 初始化信息
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY!; // 🔁 替换为你的真实值
const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ERC721_ADDRESS!;
const ERC20_ADDRESS = process.env.NEXT_PUBLIC_ERC20_ADDRESS!;
const CHAIN = sepolia;

/**
 * 用户调用 createToken，使用 ERC20 支付 + Paymaster Sponsor gas
 */
export async function mintNftGasless({
  tokenId,
  tokenURI,
  privateKey,
}: {
  tokenId: number;
  tokenURI: string;
  privateKey: string;
}) {
  // 从 localStorage 拿用户 EOA 私钥（你也可以用 Web3Auth 等）

  const signer = LocalAccountSigner.privateKeyToAccountSigner(
    privateKey as `0x${string}`
  );

  // 创建 Smart Account 客户端（使用默认 Paymaster）
  const smartAccountClient = await createLightAccountAlchemyClient({
    chain: CHAIN,
    apiKey: ALCHEMY_API_KEY,
    signer,
  });

  // 获取合约钱包地址
  const smartAccountAddress = await smartAccountClient.getAddress();
  console.log("✅ Smart Account:", smartAccountAddress);

  // 用户必须预先 approve ERC20 给 NFT_CONTRACT（仅一次）
  const erc20 = new ethers.Contract(
    ERC20_ADDRESS,
    ["function approve(address spender, uint256 amount) returns (bool)"],
    new ethers.Wallet(
      privateKey,
      new ethers.JsonRpcProvider(
        `https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
      )
    )
  );
  const approveTx = await erc20.approve(
    NFT_CONTRACT_ADDRESS,
    ethers.parseEther("1000")
  );
  await approveTx.wait();
  console.log("✅ ERC20 Approved");

  // 构建调用 calldata
  const iface = new ethers.Interface(erc721Abi);
  const calldata = iface.encodeFunctionData("createToken", [tokenId, tokenURI]);

  // 发起 gasless UserOperation
  const userOp = await smartAccountClient.sendUserOperation({
    target: NFT_CONTRACT_ADDRESS,
    data: calldata,
  } as any);

  console.log("⏳ UserOperation sent:", userOp);
  const txHash = await smartAccountClient.waitForUserOperationTransaction(
    userOp
  );
  console.log("✅ TX completed:", txHash);

  return txHash;
}
