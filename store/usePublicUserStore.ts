import { PublicUser } from "@/types/user";
import { create } from "zustand";

interface PublicUserStore {
  user: PublicUser | null;
  setUser: (user: PublicUser) => void;
  clearUser: () => void;
  isLoggedIn: () => boolean;
}

export const usePublicUserStore = create<PublicUserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  isLoggedIn: () => get().user !== null,
}));
