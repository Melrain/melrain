"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { LogoutButton } from "@/components/LogoutButton";

export default function Page() {
  return (
    <AuthGuard redirectTo="/web3demo/login">
      <div className="text-white">欢迎回来!</div>
      <LogoutButton />
    </AuthGuard>
  );
}
