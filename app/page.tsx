"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { LoginForm } from "./auth/components/LoginForm";
import { RegisterForm } from "./auth/components/RegisterForm";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "login" | "register";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");

  // 如果已登入就跳轉到記帳頁面
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/accounting");
    }
  }, [isAuthenticated, isLoading, router]);

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

  // 已登入，重新導向中
  if (isAuthenticated) {
    return null;
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

          {/* 根據 mode 顯示不同的表單*/}
          {mode === "login" ? (
            <LoginForm
              onSuccess={() => router.push("/accounting")}
              onSwitchToRegister={() => setMode("register")}
              onLogin={login}
            />
          ) : (
            <RegisterForm
              onSuccess={() => router.push("/accounting")}
              onSwitchToLogin={() => setMode("login")}
              onRegister={register}
            />
          )}
        </div>
      </main>
    </>
  );
}
