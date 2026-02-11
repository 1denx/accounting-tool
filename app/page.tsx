"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "./auth/components/LoginForm";
import { RegisterForm } from "./auth/components/RegisterForm";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "login" | "register";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login, register, user } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">載入中...</p>
        </div>
      </div>
    );
  }

  // 未登入，顯示登入 / 註冊表單
  return (
    <>
      <header className="w-full">
        <h2 className="text-2xl font-semibold text-center py-5 bg-foreground text-background">
          Accounting
        </h2>
      </header>
      <main className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">簡易記帳工具</h1>
            <p className="mt-1 text-muted-foreground">管理您的收支記錄</p>
          </div>

          {/* 如果已登入，顯示歡迎詞與進入按鈕 */}
          {isAuthenticated ? (
            <div className="bg-card p-8 rounded-lg border shadow-sm text-center space-y-4">
              <p className="text-lg">
                歡迎回來，<span className="font-semibold">{user?.displayName || "使用者"}</span>
              </p>
              <Button className="w-full" size="lg" onClick={() => router.push("/accounting")}>
                開始使用
              </Button>
            </div>
          ) : (
            <>
              {/* 未登入時根據 mode 顯示不同的表單*/}
              {mode === "login" ? (
                <LoginForm
                  onSuccess={() => router.push("/")}
                  onSwitchToRegister={() => setMode("register")}
                  onLogin={login}
                />
              ) : (
                <RegisterForm
                  onSuccess={() => router.push("/")}
                  onSwitchToLogin={() => setMode("login")}
                  onRegister={register}
                />
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
