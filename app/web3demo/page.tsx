"use client";
import LoginForm from "@/components/form/LoginForm";
import { LayoutShell } from "@/components/LayoutShell";
import { UserProfileCard } from "@/components/profile/UserProfile";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useAppEnv } from "@/store/useAppEnv";
import { useTelegramUserStore } from "@/store/useTelegramUserStore";

import React, { useEffect } from "react";

const Page = () => {
  const { isTelegram } = useAppEnv();
  const { user } = useTelegramUserStore();
  const hasMounted = useHasMounted(); // ✅ 防止 SSR hydration 闪烁
  if (!hasMounted) return null;
  return (
    <LayoutShell>
      {/* user profile */}
      <div className="mt-4">
        <UserProfileCard />
      </div>
      {/* login for web */}
      <div>{!isTelegram && <LoginForm />}</div>
    </LayoutShell>
  );
};

export default Page;
