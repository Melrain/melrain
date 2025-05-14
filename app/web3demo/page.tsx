"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Erc20BalanceCard } from "@/components/erc20/Erc20BalanceCard";
import { Erc721BalanceCard } from "@/components/erc721/Erc721BalanceCard";
import { NFTGallery } from "@/components/erc721/NFTGallery";

export default function Page() {
  return (
    <AuthGuard redirectTo="/web3demo/login">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row flex-wrap gap-6">
          <Erc20BalanceCard />
          <Erc721BalanceCard />
        </div>
        <div className="w-full">
          <NFTGallery />
        </div>
      </div>
    </AuthGuard>
  );
}
