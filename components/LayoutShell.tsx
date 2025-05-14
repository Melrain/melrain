"use client";

import { useEffect } from "react";
import { useInitTelegram } from "@/hooks/useInitTelegram";
import { useAppEnv } from "@/store/useAppEnv";
import { useLangStore } from "@/store/useLangStore";
import { useTelegramUserStore } from "@/store/useTelegramUserStore";
import { usePublicUserStore } from "@/store/usePublicUserStore";

import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { AuthInitLoader } from "./auth/AuthInitLoader";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  useInitTelegram();

  const { isTelegram } = useAppEnv();
  const { isFullScreen } = useTelegramUserStore();
  const initLang = useLangStore((state) => state.initLangFromStorage);
  const initUser = usePublicUserStore((s) => s.initUserFromServer); // ✅ 替换为后端初始化

  useEffect(() => {
    console.log("🔧 LayoutShell 初始化 useEffect 触发");
    initLang();
    initUser();
  }, [initLang, initUser]);

  return (
    <div
      id="layout-shell"
      className={`w-full justify-center items-center relative ${
        isTelegram && isFullScreen ? "pt-28" : "pt-6"
      } flex flex-col min-h-screen bg-[--background] text-[--foreground]`}>
      <main className="flex-1 px-4">{children}</main>

      <StarsBackground />
      <ShootingStars />

      <AuthInitLoader />
    </div>
  );
}
