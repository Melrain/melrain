"use client";

import { useTelegramUserStore } from "@/store/useTelegramUserStore";
import { usePublicUserStore } from "@/store/usePublicUserStore";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const TelegramUserLoginCard = () => {
  const { user } = useTelegramUserStore();
  const { user: publicUser, setUser: setPublicUser } = usePublicUserStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (!user) return null;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_BASE_URL}/auth/login-telegram-user`,
        {
          telegramUserId: String(user.id),
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.avatar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPublicUser({
        userId: res.data.userId,
        authMethod: "telegram",
        telegramId: res.data.userId.replace("telegram:", ""),
        walletAddress: res.data.evmAddress,
        metadata: res.data.metadata,
      });

      localStorage.setItem("jwt-token", res.data.accessToken);
      localStorage.setItem("refresh-token", res.data.refreshToken);
    } catch (err) {
      console.error("❌ 登录失败", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 text-white border border-white/20 rounded-xl p-4 max-w-sm mx-auto shadow-md">
      <div className="flex items-center gap-4">
        <Image
          src={user?.avatar || ""}
          alt="avatar"
          width={56}
          height={56}
          className="w-14 h-14 rounded-full border border-white/20"
        />
        <div>
          <div className="font-semibold">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-300">@{user.username}</div>
        </div>
      </div>

      {!publicUser ? (
        <Button
          className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white"
          onClick={handleLogin}
          disabled={loading}>
          {loading ? "登录中..." : "登录 / 创建账户"}
        </Button>
      ) : (
        <div className="mt-4 text-sm text-gray-300 break-words">
          已登录钱包地址：
          <div className="text-white font-mono mt-1">
            {publicUser.walletAddress}
          </div>
          <Button
            onClick={() => {
              router.push("/web3demo");
            }}>
            进入Web3 MarketPlace
          </Button>
        </div>
      )}
    </div>
  );
};
