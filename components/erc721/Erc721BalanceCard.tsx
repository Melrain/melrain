"use client";

import { useState } from "react";
import { usePublicUserStore } from "@/store/usePublicUserStore";
import {
  FaStar,
  FaSyncAlt,
  FaCubes,
  FaPaperPlane,
  FaSpinner,
  FaGift,
} from "react-icons/fa";
import { getBalance } from "@/lib/erc721";

export function Erc721BalanceCard() {
  const { user } = usePublicUserStore();
  const walletAddress = user?.walletAddress ?? null;
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nftCount, setNftCount] = useState<number | null>(null);
  const [tokenId, setTokenId] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);

  const handleCopy = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGetNftCount = async () => {
    setLoading(true);
    // TODO: 接入 getNftBalance()
    const result = await getBalance({
      contractAddress: process.env.NEXT_PUBLIC_ERC721_ADDRESS!,
    });
    setLoading(false);
    if (result.success && typeof result.data === "number") {
      setNftCount(result.data);
    } else {
      setNftCount(null);
    }
  };

  const handleTransferNft = async () => {
    setTransferLoading(true);
    // TODO: 接入 transferNft()
    setTimeout(() => {
      setTransferLoading(false);
      alert(`已模拟发送 Token #${tokenId} 至 ${toAddress}`);
      setTokenId("");
      setToAddress("");
    }, 1000);
  };

  return (
    <div className="relative w-full  max-w-xl mx-auto p-6 backdrop-blur-md bg-white/5 border border-pink-500 shadow-pink-500 rounded-2xl shadow-md text-white space-y-5">
      {/* 流星角标 */}
      <div className="absolute -top-3 -right-3 bg-gradient-to-br from-pink-400 to-rose-500 p-2 rounded-full shadow-lg">
        <FaStar className="text-yellow-300 animate-pulse" />
      </div>

      <div className="flex items-center space-x-3">
        <FaCubes className="text-2xl text-pink-400 drop-shadow" />
        <h2 className="text-xl font-bold tracking-wide">我的 NFT 收藏</h2>
      </div>

      <div className="text-sm text-slate-300">
        <span className="font-medium text-white">当前地址：</span>
        {walletAddress ? (
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-2 px-2 py-1 bg-slate-800 text-pink-300 rounded-md font-mono text-xs break-all">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              <button
                onClick={handleCopy}
                className="hover:text-white transition text-xs underline underline-offset-2 focus:outline-none">
                {copied ? "已复制 ✅" : "复制"}
              </button>
            </span>

            {/* ✅ NFT 数量展示 */}
            <span className="inline-flex items-center gap-1 text-xs text-white bg-pink-500/10 border border-pink-500 px-2 py-1 rounded-md font-semibold">
              🎨 NFT 数量：
              <span className="text-rose-300 font-mono">
                {nftCount !== null ? nftCount : "?"}
              </span>
            </span>
          </div>
        ) : (
          <span className="inline-block text-red-400 font-semibold">
            未登录
          </span>
        )}
      </div>

      <button
        className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-110 active:scale-95 transition-all rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleGetNftCount}
        disabled={loading}>
        {loading ? (
          <>
            <FaSpinner className="animate-spin" /> 查询中...
          </>
        ) : (
          <>
            <FaSyncAlt /> 查询 NFT 数量
          </>
        )}
      </button>

      <button
        className="w-full py-2 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:brightness-110 active:scale-95 transition-all rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {}}
        disabled={true}>
        <>
          <FaGift /> 领取免费 NFT
        </>
      </button>

      {/* {nftCount !== null && (
        <div className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 text-center font-mono text-2xl text-rose-300 shadow-inner ring-1 ring-white/10">
          🖼️ 当前 NFT 数量：{nftCount}
        </div>
      )} */}

      {/* 发送 NFT 区块 */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <h3 className="text-lg font-semibold text-white">📤 发送 NFT</h3>

        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="w-full rounded-md bg-slate-800 text-sm px-3 py-2 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="text"
          placeholder="目标地址"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          className="w-full rounded-md bg-slate-800 text-sm px-3 py-2 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:brightness-110 active:scale-95 transition-all rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleTransferNft}
          disabled={!tokenId || !toAddress || transferLoading}>
          {transferLoading ? (
            <>
              <FaSpinner className="animate-spin" /> 正在发送...
            </>
          ) : (
            <>
              <FaPaperPlane /> 发送 NFT
            </>
          )}
        </button>
      </div>
    </div>
  );
}
