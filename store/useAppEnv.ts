// app/store/useAppEnv.ts
import { create } from 'zustand';

interface AppEnvState {
  isTelegram: boolean;
  setIsTelegram: (v: boolean) => void;
}

export const useAppEnv = create<AppEnvState>((set) => ({
  isTelegram: false,
  setIsTelegram: (v: boolean) => set({ isTelegram: v }),
}));
