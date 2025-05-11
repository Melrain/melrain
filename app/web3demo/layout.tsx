"use client";
import { LayoutShell } from "@/components/LayoutShell";
import type { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <LayoutShell>{children}</LayoutShell>
    </section>
  );
}
