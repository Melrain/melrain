"use client";

import { useEffect, useState } from "react";
import { useHasMounted } from "./useHasMounted";
import { useTelegramUserStore } from "@/store/useTelegramUserStore";
import { usePublicUserStore } from "@/store/usePublicUserStore";

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
        const res = await fetch("/api/auth/telegram", {
          method: "POST",
          body: JSON.stringify({
            telegramId: user.id,
            telegramProfile: {
              id: String(user.id),
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              photoUrl: user.avatar,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        setPublicUser(result.user);
        localStorage.setItem("jwt-token", result.token);
      } catch (err) {
        console.error("Telegram 登录失败", err);
      } finally {
        setLoading(false);
      }
    };

    registerOrLogin();
  }, [hasMounted, setPublicUser, user]);

  return { loading };
};
