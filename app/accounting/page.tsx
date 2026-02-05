"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecordForm } from "./components/RecordForm";
import { RecordList } from "./components/RecordList";
import { useAccounting } from "./hooks/useAccounting";

export default function AccountingPage() {
  const { records, handleAdd, handleDelete, subTotal } = useAccounting();

  return (
    <main className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-center text-2xl font-bold">簡易記帳工具</h1>

        {/* 輸入表單 */}
        <RecordForm onSubmit={handleAdd} />
        {/* 記錄列表 */}
        <RecordList records={records} onDelete={handleDelete} total={subTotal()} />

        <Link
          href={{
            pathname: "/",
            query: { name: "Home" },
          }}
        >
          <Button className="w-full">
            <Home className="mr-2 w-4 h-4" />
            Go Back
          </Button>
        </Link>
      </div>
    </main>
  );
}
