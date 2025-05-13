/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import api from "./axios";
import { ApiResult } from "@/types/api-result";

export async function transferToken({
  contractAddress,
  to,
  amount,
}: {
  contractAddress: string;
  to: string;
  amount: string;
}): Promise<ApiResult<string>> {
  try {
    const res = await api.post("/erc20/transfer", {
      contractAddress,
      to,
      amount,
    });

    return {
      success: true,
      data: res.data.txHash, // ✅ 改为 data
    };
  } catch (err: any) {
    console.error("[transferToken error]", err);

    const message =
      err?.response?.data?.message || err?.message || "转账失败，发生未知错误";

    return {
      success: false,
      error: message,
    };
  }
}

export async function getBalance({
  contractAddress,
}: {
  contractAddress: string;
}): Promise<ApiResult<string>> {
  try {
    const res = await api.post("/erc20/balance", {
      contractAddress,
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    console.error("[getBalance error]", err);

    const message =
      err?.response?.data?.message ||
      err?.message ||
      "查询余额失败，发生未知错误";

    return {
      success: false,
      error: message,
    };
  }
}

// lib/erc20.ts

export async function requestFreeGas(
  walletAddress: string
): Promise<ApiResult<string>> {
  try {
    const res = await api.post("/erc20/free-gas", {
      to: walletAddress,
    });

    return {
      success: true,
      data: res.data?.txHash || "请求成功但未返回交易哈希",
    };
  } catch (err: any) {
    console.error("[requestFreeGas error]", err);

    const message =
      err?.response?.data?.message || err?.message || "请求失败，发生未知错误";

    return {
      success: false,
      error: message,
    };
  }
}
