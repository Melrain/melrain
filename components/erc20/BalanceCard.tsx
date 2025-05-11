"use client";

import { useState } from "react";
import { getBalance } from "@/lib/erc20";
import { usePublicUserStore } from "@/store/usePublicUserStore";
import { FaWallet, FaSpinner, FaStar } from "react-icons/fa";

const contractAddress = process.env.NEXT_PUBLIC_ERC20_ADDRESS!;

export function BalanceCard() {
  const { user } = usePublicUserStore();
  const walletAddress = user?.walletAddress;
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetBalance = async () => {
    if (!walletAddress) return;
    setLoading(true);
    const result = await getBalance({ contractAddress, walletAddress });
    setLoading(false);
    console.log("[getBalance result]", result);
    if (result.success && result.data) {
      setBalance(result.data);
    } else {
      setBalance(null);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl text-white space-y-5">
      {/* 流星角标 */}
      <div className="absolute -top-3 -right-3 bg-gradient-to-br from-purple-400 to-blue-500 p-2 rounded-full shadow-lg">
        <FaStar className="text-yellow-300 animate-pulse" />
      </div>

      <div className="flex items-center space-x-3">
        <FaWallet className="text-2xl text-sky-400 drop-shadow" />
        <h2 className="text-xl font-bold tracking-wide text-white">
          ERC20 余额查询
        </h2>
      </div>

      <div className="text-sm text-slate-300">
        地址：<span className="break-all">{walletAddress ?? "未登录"}</span>
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
          "点我召唤余额 ✨"
        )}
      </button>

      {balance !== null && (
        <div className="mt-3 px-4 py-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 text-center font-mono text-2xl text-emerald-300 shadow-inner ring-1 ring-white/10">
          🌠 余额：{balance}
        </div>
      )}
    </div>
  );
}
