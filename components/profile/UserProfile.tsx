"use client";

import Image from "next/image";
import { usePublicUserStore } from "@/store/usePublicUserStore";
import { useAppEnv } from "@/store/useAppEnv";
import { useTelegramUserStore } from "@/store/useTelegramUserStore";

export const UserProfileCard = () => {
  const { isTelegram } = useAppEnv();
  const { user: tgUser } = useTelegramUserStore();
  const { user } = usePublicUserStore();

  if (!user) return null;

  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm shadow-lg text-white flex items-center gap-4">
      <Image
        src={isTelegram ? tgUser?.avatar ?? "/default.png" : "/default.png"}
        alt="avatar"
        width={48}
        height={48}
        className="rounded-full"
      />
      <div>
        <p className="font-semibold">
          {isTelegram
            ? `${tgUser?.firstName ?? ""} ${tgUser?.lastName ?? ""}`
            : user.userId}
        </p>
        <p className="text-sm text-gray-300">
          {user.email ?? user.phone ?? user.telegramId ?? "匿名用户"}
        </p>
        <p className="text-sm text-gray-400 truncate max-w-[200px]">
          钱包地址: {user.walletAddress}
        </p>
        {user.metadata?.balance && (
          <p className="text-sm text-green-400">
            余额: {user.metadata.balance}
          </p>
        )}
      </div>
    </div>
  );
};
