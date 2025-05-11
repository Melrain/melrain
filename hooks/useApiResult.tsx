// hooks/useApiResult.ts
import { ApiResult } from "@/types/api-result";

export function useApiResult() {
  return function handleResult<T>(
    result: ApiResult<T>,
    messages?: {
      success?: string;
      error?: string;
    }
  ): {
    ok: boolean;
    value?: T;
    error?: string;
  } {
    if (result.success) {
      if (messages?.success) console.log("[Success]", messages.success);
      return { ok: true, value: result.data };
    } else {
      const fallback = messages?.error || result.error || "操作失败";
      console.warn("[Error]", fallback);
      return { ok: false, error: fallback };
    }
  };
}
