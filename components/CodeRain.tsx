"use client";

import { useEffect, useRef } from "react";

const chars = "01<>/={}+-_#$%&@";

export const CodeRain = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const count = Math.floor(window.innerWidth / 20);
    const spans: HTMLSpanElement[] = [];

    for (let i = 0; i < count * 2; i++) {
      const span = document.createElement("span");
      span.className = "code-char";
      span.textContent = chars[Math.floor(Math.random() * chars.length)];
      span.style.left = `${(i % count) * 20}px`;
      span.style.animationDelay = `${Math.random() * 3}s`;
      container.appendChild(span);
      spans.push(span);
    }

    return () => spans.forEach((el) => el.remove());
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
};
