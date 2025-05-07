import { create } from 'zustand';

export interface ITelegramUser {
  id: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar?: string;
  languageCode?: string;
  isBot?: boolean;
}

interface TelegramUserStore {
  user: ITelegramUser | null;
  isFullScreen: boolean;
  setUser: (user: ITelegramUser) => void;
  clearUser: () => void;
  setFullScreen: (value: boolean) => void;
  toggleFullScreen: () => void;
}

export const useTelegramUserStore = create<TelegramUserStore>((set) => ({
  user: null,
  isFullScreen: false,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  setFullScreen: (value) => set({ isFullScreen: value }),
  toggleFullScreen: () =>
    set((state) => ({ isFullScreen: !state.isFullScreen })),
}));
