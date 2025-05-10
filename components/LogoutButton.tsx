"use client";
import { usePublicUserStore } from "@/store/usePublicUserStore";

export const LogoutButton = () => {
  const logout = usePublicUserStore((s) => s.logout);

  return (
    <button
      onClick={logout}
      className="text-sm text-red-500 hover:underline">
      退出登录
    </button>
  );
};
