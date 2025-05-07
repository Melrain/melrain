// store/useLangStore.ts
import { create } from "zustand";

type Lang = "zh" | "en";

interface LangStore {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  initLangFromStorage: () => void;
}

export const useLangStore = create<LangStore>((set, get) => ({
  lang: "zh",

  setLang: (lang) => {
    localStorage.setItem("lang", lang);
    set({ lang });
  },

  toggleLang: () => {
    const newLang = get().lang === "zh" ? "en" : "zh";
    localStorage.setItem("lang", newLang);
    set({ lang: newLang });
  },

  initLangFromStorage: () => {
    const stored = localStorage.getItem("lang");
    if (stored === "zh" || stored === "en") {
      set({ lang: stored });
    }
  },
}));
