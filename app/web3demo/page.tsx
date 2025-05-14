"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Erc20BalanceCard } from "@/components/erc20/Erc20BalanceCard";
import { Erc721BalanceCard } from "@/components/erc721/Erc721BalanceCard";
import { NFTGallery } from "@/components/erc721/NFTGallery";

export default function Page() {
  return (
    <AuthGuard redirectTo="/web3demo/login">
      <div className="flex flex-col space-y-6 max-w-7xl">
        <div className="flex flex-row flex-wrap justify-center items-center gap-6 w-full">
          <div className="flex-1 min-w-[300px] max-w-[600px]">
            <Erc20BalanceCard />
          </div>
          <div className="flex-1 min-w-[300px] max-w-[600px]">
            <Erc721BalanceCard />
          </div>
        </div>

        <div className="flex-1">
          <NFTGallery />
        </div>
      </div>
    </AuthGuard>
  );
}
