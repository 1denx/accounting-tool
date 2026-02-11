"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecordForm } from "./components/RecordForm";
import { RecordList } from "./components/RecordList";
import { useAccounting } from "./hooks/useAccounting";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";

export default function AccountingPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { records, isLoading: recordsLoading, handleAdd, handleDelete, subTotal } = useAccounting();

  // 未登入時跳轉到首頁
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // 登出
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("登出失敗：", error);
      alert("登出失敗，請稍後再試");
    }
  };

  // 載入中狀態
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">載入中...</p>
        </div>
      </div>
    );
  }

  // 未登入
  if (!user) {
    return null;
  }

  // 已登入
  return (
    <div>
      <nav className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">簡易記帳工具</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              歡迎，{user.displayName || user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              登出
            </Button>
          </div>
        </div>
      </nav>
      <main className="min-h-screen bg-muted/30 p-4 md:p-8">
        <div className="mx-auto max-w-md space-y-6">
          {/* 輸入表單 */}
          <RecordForm onSubmit={handleAdd} />
          {/* 記錄列表 */}
          {recordsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">載入記錄中...</span>
            </div>
          ) : (
            <RecordList records={records} onDelete={handleDelete} total={subTotal} />
          )}

          <Button className="w-full" variant="outline" onClick={() => router.push("/")}>
            <Home className="mr-2 w-4 h-4" />
            返回首頁
          </Button>
        </div>
      </main>
    </div>
  );
}
