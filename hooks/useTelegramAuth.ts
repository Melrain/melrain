"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useHasMounted } from "./useHasMounted";
import { useTelegramUserStore } from "@/store/useTelegramUserStore";
import { usePublicUserStore } from "@/store/usePublicUserStore";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const useTelegramAuth = () => {
  const { user } = useTelegramUserStore();
  const setPublicUser = usePublicUserStore((s) => s.setUser);
  const hasMounted = useHasMounted();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasMounted || !user) return;

    const registerOrLogin = async () => {
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
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setPublicUser(res.data.user);
        localStorage.setItem("jwt-token", res.data.token);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("❌ Telegram 登录失败:", err?.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    registerOrLogin();
  }, [hasMounted, setPublicUser, user]);

  return { loading };
};
