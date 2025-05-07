"use client";

import { useState } from "react";
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

export default function LoginForm() {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    if (!email.includes("@")) {
      toast({ title: "请输入有效邮箱" });
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      toast({ title: "验证码发送成功", description: `已发送至 ${email}` });
      setStep("otp");
    } catch {
      toast({
        title: "发送失败",
        description: "请稍后再试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = () => {
    if (otp.length !== 6) {
      toast({ title: "请输入完整验证码" });
      return;
    }

    toast({ title: "验证成功", description: `验证码为：${otp}` });
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
          </div>
        )}
      </div>
    </div>
  );
}
