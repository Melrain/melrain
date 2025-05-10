// components/auth/AuthInitLoader.tsx
"use client";
import { usePublicUserStore } from "@/store/usePublicUserStore";

export const AuthInitLoader = () => {
  const initialized = usePublicUserStore((s) => s.initialized);
  if (!initialized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center text-white">
        加载中...
      </div>
    );
  }
  return null;
};
