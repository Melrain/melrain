"use client";

import { useState } from "react";
import { getBalance, requestFreeGas, transferToken } from "@/lib/erc20";
import { usePublicUserStore } from "@/store/usePublicUserStore";
import {
  FaWallet,
  FaSpinner,
  FaStar,
  FaPaperPlane,
  FaBolt,
} from "react-icons/fa";

const contractAddress = process.env.NEXT_PUBLIC_ERC20_ADDRESS!;

export function Erc20BalanceCard() {
  const { user } = usePublicUserStore();
  const walletAddress = user?.walletAddress ?? null; // 仅用于展示
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [gasLoading, setGasLoading] = useState(false);
  const [gasMessage, setGasMessage] = useState<string | null>(null);

  const handleCopy = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 20000); // 2秒后恢复
  };

  const handleGetBalance = async () => {
    if (!walletAddress) return;
    setLoading(true);
    const result = await getBalance({ contractAddress });
    setLoading(false);
    if (result.success && result.data) {
      setBalance(result.data);
    } else {
      setBalance(null);
    }
  };

  const handleTransfer = async () => {
    if (!walletAddress || !recipient || !amount) return;
    setTransferLoading(true);
    const result = await transferToken({
      contractAddress,
      to: recipient,
      amount,
    });
    setTransferLoading(false);
    if (result.success) {
      await handleGetBalance(); // 刷新余额
      alert(`✅ 转账成功！交易哈希：${result.data}`);
      setRecipient("");
      setAmount("");
    } else {
      alert(`❌ 转账失败：${result.error}`);
    }
  };

  const handleRequestFreeGas = async () => {
    if (!walletAddress) return;
    setGasLoading(true);
    setGasMessage(null);
    const result = await requestFreeGas(walletAddress);
    setGasLoading(false);

    if (result.success) {
      setGasMessage("✅ 免费 Gas 请求成功！交易哈希：" + result.data);
      await handleGetBalance(); // 可选：请求完后刷新 ETH 余额
    } else {
      setGasMessage("❌ 请求失败：" + result.error);
    }

    setTimeout(() => setGasMessage(null), 8000);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto p-6 backdrop-blur-md bg-white/5 border border-white/10 shadow-green-400 rounded-2xl shadow-md text-white space-y-5">
      {/* 流星角标 */}
      <div className="absolute -top-3 -right-3 bg-gradient-to-br from-purple-400 to-blue-500 p-2 rounded-full shadow-lg">
        <FaStar className="text-yellow-300 animate-pulse" />
      </div>

      <div className="flex items-center space-x-3">
        <FaWallet className="text-2xl text-sky-400 drop-shadow" />
        <h2 className="text-xl font-bold tracking-wide">我的 ERC20 钱包</h2>
      </div>

      <div className="text-sm text-slate-300">
        <span className="font-medium text-white">当前地址：</span>
        {walletAddress ? (
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-2 px-2 py-1 bg-slate-800 text-sky-300 rounded-md font-mono text-xs break-all">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              <button
                onClick={handleCopy}
                className="hover:text-white transition text-xs underline underline-offset-2 focus:outline-none">
                {copied ? "已复制 ✅" : "复制"}
              </button>
            </span>

            {/* ✅ 显示 ERC20 余额 */}
            <span className="inline-flex items-center gap-1 text-xs text-white bg-emerald-500/10 border border-emerald-500 px-2 py-1 rounded-md font-semibold">
              🪙 余额：
              <span className="text-emerald-300 font-mono">
                {balance !== null ? balance : "?"}
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
        className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500 hover:brightness-110 active:scale-95 transition-all rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleGetBalance}
        disabled={!walletAddress || loading}>
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <FaSpinner className="animate-spin" /> 查询中...
          </span>
        ) : (
          "🔄 刷新余额"
        )}
      </button>

      <button
        className="w-full py-2 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:brightness-110 active:scale-95 transition-all rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleRequestFreeGas}
        disabled={!walletAddress || gasLoading}>
        {gasLoading ? (
          <>
            <FaSpinner className="animate-spin" /> 请求中...
          </>
        ) : (
          <>
            <FaBolt /> 领取免费 Gas
          </>
        )}
      </button>

      {gasMessage && (
        <div className="text-sm text-center font-medium text-sky-300 mt-2 break-words">
          {gasMessage}
        </div>
      )}

      {/* {balance !== null && (
        <div className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 text-center font-mono text-2xl text-emerald-300 shadow-inner ring-1 ring-white/10">
          🌠 当前余额：{balance}
        </div>
      )} */}

      {/* 转账区块 */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <h3 className="text-lg font-semibold text-white">💸 发送 ERC20 代币</h3>

        <input
          type="text"
          placeholder="接收地址"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full rounded-md bg-slate-800 text-sm px-3 py-2 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="数量"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-md bg-slate-800 text-sm px-3 py-2 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          className="w-full py-2 px-4 bg-gradient-to-r from-teal-500 to-green-500 hover:brightness-110 active:scale-95 transition-all rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleTransfer}
          disabled={!walletAddress || !recipient || !amount || transferLoading}>
          {transferLoading ? (
            <>
              <FaSpinner className="animate-spin" /> 正在发送...
            </>
          ) : (
            <>
              <FaPaperPlane /> 确认转账
            </>
          )}
        </button>
      </div>
    </div>
  );
}
