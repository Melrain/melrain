// components/BreathingCircle.tsx
"use client";

import React from "react";

const BreathingCircle = () => {
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32">
      {/* 发光呼吸外圈 */}
      <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-30 animate-breath blur-xl" />
      {/* 固定边框圈 */}
      <div className="absolute inset-2 rounded-full border-4 border-cyan-400" />
    </div>
  );
};

export default BreathingCircle;
