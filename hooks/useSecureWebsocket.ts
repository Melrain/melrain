// hooks/useSecureWebSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { usePublicUserStore } from "@/store/usePublicUserStore";

let socket: Socket;

export const useSecureWebSocket = () => {
  const { user, initialized } = usePublicUserStore();

  useEffect(() => {
    if (initialized && user && !socket) {
      console.log("🛰️ 连接 WebSocket...");
      socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("✅ WebSocket 连接成功");
      });
    }
  }, [initialized, user]);

  return socket;
};
