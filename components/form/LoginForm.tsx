/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { usePublicUserStore } from "@/store/usePublicUserStore";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginForm() {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const router = useRouter();
  const { setUser } = usePublicUserStore();

  const sendCode = async () => {
    if (!email.includes("@")) {
      toast({ title: "请输入有效邮箱" });
      return;
    }

    setLoading(true);
    try {
      // TODO: 替换为真实 API 请求
      // await new Promise((res) => setTimeout(res, 800));
      // toast({ title: "验证码发送成功", description: `已发送至 ${email}` });
      // setStep("otp");
      // setResendCountdown(30);
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/request-login-code`,
        {
          email: email,
        }
      );
      console.log("[LoginForm]:request login code response:", response);
      setStep("otp");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const verifyCode = async () => {
    if (otp.length !== 6) {
      toast({ title: "请输入完整验证码" });
      return;
    }
    console.log("发送的邮箱:", email);
    console.log("发送的验证码:", otp);
    try {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/verify-login-code`,
        {
          email,
          code: otp,
        }
      );

      console.log("[LoginForm]:verify code response:", response);

      const { userId, evmAddress, smartAccount, authMethod } = response.data;

      // ✅ 存储 token 到 localStorage

      localStorage.setItem("userId", userId);
      localStorage.setItem("evmAddress", evmAddress);
      localStorage.setItem("smartAccount", smartAccount);
      localStorage.setItem("authMethod", authMethod);

      const publicUserData = {
        userId: userId,
        authMethod: authMethod,
        walletAddress: evmAddress,
      };

      setUser(publicUserData);

      // ✅ 可选：跳转页面
      router.push("/web3demo"); // 需引入 useRouter()
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-24 px-6">
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          登录到你的账户
        </h2>

        {step === "email" ? (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-white text-sm">
                邮箱地址
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-white/10 border border-white/30 placeholder:text-gray-400 text-white focus-visible:ring-white focus-visible:ring-offset-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button
              className="w-full bg-white/20 text-white hover:bg-white/30"
              onClick={sendCode}
              disabled={loading}>
              {loading ? "发送中..." : "发送验证码"}
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1 text-sm text-white text-center">
              <p>
                我们已向{" "}
                <span className="font-semibold text-cyan-300">{email}</span>{" "}
                发送了验证码
              </p>
              <button
                onClick={() => {
                  setStep("email");
                  setOtp("");
                }}
                className="text-xs underline text-cyan-400 hover:text-cyan-200 mt-1">
                修改邮箱地址
              </button>
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">输入验证码</Label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-10 h-12 text-white bg-white/10 border border-white/30 backdrop-blur-sm focus-visible:ring-white"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              className="w-full bg-white/20 text-white hover:bg-white/30"
              onClick={verifyCode}>
              验证并登录
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-white"
              onClick={sendCode}
              disabled={resendCountdown > 0 || loading}>
              {resendCountdown > 0
                ? `重新发送验证码 (${resendCountdown}s)`
                : "重新发送验证码"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
