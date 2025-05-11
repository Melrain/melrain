"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { BalanceCard } from "@/components/erc20/BalanceCard";

export default function Page() {
  return (
    <AuthGuard redirectTo="/web3demo/login">
      <div>
        <BalanceCard />
      </div>
    </AuthGuard>
  );
}
