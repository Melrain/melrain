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
  walletAddress,
}: {
  contractAddress: string;
  walletAddress: string;
}): Promise<ApiResult<string>> {
  try {
    const res = await api.post("/erc20/balance", {
      contractAddress,
      walletAddress,
    });
    return {
      success: true,
      data: res.data, // ✅ 改为 data
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
