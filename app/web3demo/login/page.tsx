"use client";

import React, { useEffect } from "react";
import LoginForm from "@/components/form/LoginForm";
import { TelegramUserLoginCard } from "@/components/auth/TelegramUserLoginCard";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useAppEnv } from "@/store/useAppEnv";
import { usePublicUserStore } from "@/store/usePublicUserStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const { isTelegram } = useAppEnv();
  const { user } = usePublicUserStore();

  useEffect(() => {
    // ✅ 已登录 → 重定向到主页或 dashboard
    if (user) {
      router.replace("/web3demo"); // 或 "/dashboard" 等
    }
  }, [router, user]);

  if (!hasMounted || user) return null; // ✅ 防止闪屏

  return (
    <div className="mt-4 space-y-4">
      <TelegramUserLoginCard />
      {!isTelegram && <LoginForm />}
    </div>
  );
};

export default Page;
