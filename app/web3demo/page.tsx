"use client";

import React from "react";
import LoginForm from "@/components/form/LoginForm";
import { LayoutShell } from "@/components/LayoutShell";
import { UserProfileCard } from "@/components/profile/UserProfile";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useAppEnv } from "@/store/useAppEnv";
import { useTelegramAuth } from "@/hooks/useTelegramAuth";

const Page = () => {
  const hasMounted = useHasMounted();
  const { isTelegram } = useAppEnv();

  if (!hasMounted) return null;

  return (
    <LayoutShell>
      <div className="mt-4 space-y-4">
        <UserProfileCard />
        {!isTelegram && <LoginForm />}
      </div>
    </LayoutShell>
  );
};

export default Page;
