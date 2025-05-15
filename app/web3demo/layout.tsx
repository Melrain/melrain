"use client";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { LayoutShell } from "@/components/LayoutShell";
import type { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard redirectTo="/web3demo/login">
      <section>
        <LayoutShell>{children}</LayoutShell>
      </section>
    </AuthGuard>
  );
}
