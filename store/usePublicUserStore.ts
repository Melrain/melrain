"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// store/usePublicUserStore.ts
import { create } from "zustand";
import api from "@/lib/axios";

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
  initUserFromServer: () => Promise<void>;
  clearUser: () => void;
  logout: () => Promise<void>;
}

export const usePublicUserStore = create<Store>((set) => ({
  user: null,
  initialized: false,

  setUser: (user) => {
    set({ user });
  },

  initUserFromServer: async () => {
    try {
      const res = await api.get("/auth/me"); // 会自动带上 cookie
      console.log("✅ /auth/me 响应:", res.data);
      set({ user: res.data.user, initialized: true });
    } catch (err) {
      console.error("❌ /auth/me 请求失败:", err);
      set({ user: null, initialized: true });
    }
  },

  clearUser: () => {
    set({ user: null, initialized: true });
  },

  logout: async () => {
    try {
      await api.post("/auth/logout", {
        userId: usePublicUserStore.getState().user?.userId,
      });
    } catch (err) {
      console.warn("登出失败", err);
    }
    set({ user: null, initialized: true });
  },
}));
