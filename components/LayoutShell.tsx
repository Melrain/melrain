"use client";

import { useInitTelegram } from "@/hooks/useInitTelegram";
import { useAppEnv } from "@/store/useAppEnv";
import { useLangStore } from "@/store/useLangStore";
import { useTelegramUserStore } from "@/store/useTelegramUserStore";
import { useEffect } from "react";
import LangToggleButton from "./LangToggleButton";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  useInitTelegram();
  const { isTelegram } = useAppEnv();
  const { isFullScreen } = useTelegramUserStore();

  const initLang = useLangStore((state) => state.initLangFromStorage);

  useEffect(() => {
    initLang(); // 初始化语言状态
  }, [initLang]);
  return (
    <div
      id="layout-shell"
      className={`safe-area-wrapper relative ${
        isTelegram && isFullScreen ? "pt-28" : "pt-6"
      } flex flex-col min-h-screen bg-[--background] text-[--foreground]`}>
      <main className="flex-1 px-4">{children}</main>
      <div className="absolute top-0 right-0 z-50">
        <LangToggleButton />
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
