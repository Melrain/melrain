"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { BalanceCard } from "@/components/erc20/BalanceCard";
import { NFTGallery } from "@/components/erc721/NFTGallery";

export default function Page() {
  return (
    <AuthGuard redirectTo="/web3demo/login">
      <div className="flex flex-col space-y-6">
        <div>
          <BalanceCard />
        </div>
        <div className="w-full">
          <NFTGallery />
        </div>
      </div>
    </AuthGuard>
  );
}
