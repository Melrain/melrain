// src/components/auth/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePublicUserStore } from "@/store/usePublicUserStore";

interface Props {
  children: React.ReactNode;
  redirectTo?: string; // 默认为 "/login"
}

export const AuthGuard = ({
  children,
  redirectTo = "/web3demo/login",
}: Props) => {
  const router = useRouter();
  const { user, initialized, initUserFromStorage } = usePublicUserStore();

  useEffect(() => {
    // 页面加载时恢复状态
    if (!initialized) {
      initUserFromStorage();
    } else if (!user) {
      router.replace(redirectTo);
    }
  }, [initialized, user, router, redirectTo, initUserFromStorage]);

  if (!initialized) return <div className="text-white">加载中...</div>;
  if (!user) return null;

  return <>{children}</>;
};
