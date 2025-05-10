import axios from "axios";
import { usePublicUserStore } from "@/store/usePublicUserStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  withCredentials: true, // ✅ 关键，携带 cookie
});

let isRefreshing = false;

// ✅ 自动处理 401 并尝试刷新 token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const isRefresh = originalRequest.url.includes("/auth/refresh-token");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefresh
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await api.post("/auth/refresh-token");
          isRefreshing = false;

          // ✅ retry 原始请求
          return api(originalRequest);
        } catch (refreshErr) {
          isRefreshing = false;

          // ❌ refresh 失败则清除状态
          usePublicUserStore.getState().clearUser();
          return Promise.reject(refreshErr);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
