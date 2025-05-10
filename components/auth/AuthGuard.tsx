// components/auth/AuthGuard.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePublicUserStore } from "@/store/usePublicUserStore";

export const AuthGuard = ({
  children,
  redirectTo = "/login",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) => {
  const router = useRouter();
  const { user, initialized, initUserFromServer } = usePublicUserStore();

  useEffect(() => {
    if (!initialized) {
      initUserFromServer(); // ✅ 替换为后端初始化
    } else if (!user) {
      router.replace(redirectTo);
    }
  }, [initialized, user, redirectTo, router, initUserFromServer]);

  if (!initialized) return <div className="text-white">加载中...</div>;
  if (!user) return null;

  return <>{children}</>;
};
