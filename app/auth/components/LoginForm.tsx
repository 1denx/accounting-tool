"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

export function LoginForm({ onSuccess, onSwitchToRegister, onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await onLogin(email, password);

      if (result.success) {
        setEmail("");
        setPassword("");
        onSuccess();
      } else {
        setError(result.error || "登入失敗");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">登入帳號</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 錯誤訊息 */}
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground"></Mail>
            <Input
              type="email"
              placeholder="電子信箱"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pl-10"
              required
              disabled={isLoading}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground"></Lock>
            <Input
              type="password"
              placeholder="密碼"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pl-10"
              required
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-foreground text-background transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                登入中...
              </>
            ) : (
              <>
                <LogIn className="mr-2 w-4 h-4" />
                登入
              </>
            )}
          </Button>
        </form>
        {/* 分隔線 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">還沒有帳號？</span>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full bg-transparent"
          onClick={onSwitchToRegister}
          disabled={isLoading}
        >
          立即註冊
        </Button>
      </CardContent>
    </Card>
  );
}
