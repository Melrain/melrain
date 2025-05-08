"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface PublicUser {
  userId: string;
  authMethod: string;
  walletAddress: string;
  telegramId?: string;
  metadata?: any;
}

interface Store {
  user: PublicUser | null;
  initialized: boolean;
  setUser: (user: PublicUser) => void;
  initUserFromStorage: () => void;
  clearUser: () => void;
}

export const usePublicUserStore = create<Store>((set) => ({
  user: null,
  initialized: false,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  initUserFromStorage: () => {
    console.log("🌀 initUserFromStorage 被调用");
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        console.log("✅ 读取成功", parsed);
        set({ user: parsed, initialized: true });
      } else {
        console.log("❌ user 不存在");
        set({ user: null, initialized: true });
      }
    } catch (err) {
      console.error("❌ 解析 user 失败", err);
      set({ user: null, initialized: true });
    }
  },

  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null, initialized: true });
  },
}));
