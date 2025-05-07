"use client";

import { useTelegramUserStore } from "@/store/useTelegramUserStore";
import { usePublicUserStore } from "@/store/usePublicUserStore";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const UserProfileCard = () => {
  const { user } = useTelegramUserStore();
  const setPublicUser = usePublicUserStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_BASE_URL}/auth/login-telegram-user`,
        {
          telegramId: user.id,
          telegramProfile: {
            id: String(user.id),
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.avatar,
          },
        }
      );

      setPublicUser(res.data.user);
      localStorage.setItem("jwt-token", res.data.token);
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
          width={14}
          height={14}
          className="w-14 h-14 rounded-full border border-white/20"
        />
        <div>
          <div className="font-semibold">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-300">@{user.username}</div>
        </div>
      </div>
      <Button
        className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white"
        onClick={handleLogin}
        disabled={loading}>
        {loading ? "登录中..." : "登录 / 创建账户"}
      </Button>
    </div>
  );
};
