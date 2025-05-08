"use client";

import React, { useEffect } from "react";
import LoginForm from "@/components/form/LoginForm";
import { LayoutShell } from "@/components/LayoutShell";
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
    if (!user) {
      router.push("/web3demo/login"); // ✅ 正确：副作用放在 useEffect 中
    }
  }, [router, user]);
  if (!hasMounted) return null;
  return (
    <LayoutShell>
      <div className="mt-4 space-y-4">
        <TelegramUserLoginCard />
        {!isTelegram && <LoginForm />}
      </div>
    </LayoutShell>
  );
};

export default Page;
