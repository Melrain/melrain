"use client";

import React from "react";
import { useLangStore } from "../store/useLangStore";

const LangToggleButton = () => {
  const lang = useLangStore((state) => state.lang);
  const toggleLang = useLangStore((state) => state.toggleLang);

  return (
    <button
      onClick={toggleLang}
      className="text-xs md:text-sm text-gray-400 hover:text-white border border-gray-600 px-3 py-1 rounded transition">
      {lang === "zh" ? "🌐 English" : "🌐 中文"}
    </button>
  );
};

export default LangToggleButton;
