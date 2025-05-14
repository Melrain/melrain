/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResult } from "@/types/api-result";
import api from "./axios";

export async function getBalance({
  contractAddress,
}: {
  contractAddress: string;
}): Promise<ApiResult<string>> {
  try {
    console.log("fetching erc721 token:/erc721/balance");
    const res = await api.post("/erc721/balance", {
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
