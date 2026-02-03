"use client";

import { useState } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// 型別定義
type RecordType = "income" | "expense";

interface Record {
  id: number;
  type: RecordType;
  amount: number;
  desc: string;
}

export default function AccountingPage() {
  const [type, setType] = useState<RecordType>("expense"); // 紀錄收入 or 支出，預設為支出
  const [amount, setAmount] = useState<string>(""); // 紀錄輸入的金額
  const [desc, setDesc] = useState<string>(""); // 記錄細項描述
  const [records, setRecords] = useState<Record[]>([]); // 儲存紀錄

  // (): void 表示這個函式不回傳任何值
  const handleAdd = (): void => {
    if (!amount || !desc) return;
    if (isNaN(Number(amount))) return;

    // 建立新紀錄
    const newRecord: Record = {
      id: Date.now(),
      type: type,
      amount: parseFloat(amount),
      desc: desc,
    };

    // 更新 record 狀態，把新加入的資料加到現有陣列的前面
    setRecords([newRecord, ...records]);

    setAmount("");
    setDesc("");
  };

  // 刪除
  const handleDelete = (id: number): void => {
    setRecords(
      records.filter(record => {
        return record.id !== id;
      }),
    );
  };

  // 小計
  const subTotal = (): number => {
    return records.reduce((total: number, record: Record) => {
      if (record.type === "income") {
        return total + record.amount;
      } else {
        return total - record.amount;
      }
    }, 0);
  };

  return (
    <main className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-center text-2xl font-bold">簡易記帳工具</h1>

        {/* 輸入表單 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">新增記錄</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 收入/支出選擇 */}
            <div className="flex gap-2">
              <Button
                variant={type === "income" ? "default" : "outline"}
                className={`flex-1 ${type === "income" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                onClick={() => setType("income")}
              >
                <TrendingUp className="mr-2 w-4 h-4" />
                收入
              </Button>
              <Button
                variant={type === "expense" ? "default" : "outline"}
                className={`flex-1 ${type === "expense" ? "bg-rose-600 hover:bg-rose-700" : ""}`}
                onClick={() => setType("expense")}
              >
                <TrendingDown className="mr-2 w-4 h-4" />
                支出
              </Button>
            </div>

            {/* 金額輸入 */}
            <Input
              type="number"
              min={1}
              placeholder="金額"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />

            {/* 細項輸入 */}
            <Input
              type="text"
              placeholder="細項說明"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleAdd();
                }
              }}
            />

            {/* 新增按鈕 */}
            <Button className="w-full" onClick={handleAdd}>
              <Plus className="mr-2 w-4 h-4" />
              新增
            </Button>
          </CardContent>
        </Card>

        {/* 記錄列表 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">記錄列表</CardTitle>
          </CardHeader>
          <CardContent>
            {records.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">尚無記錄，請新增一筆！</p>
            ) : (
              <ul className="space-y-2">
                {records.map((record: Record) => (
                  <li
                    key={record.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <p
                        className={`text-xl font-bold ${record.type === "income" ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {record.type === "income" ? "+" : "-"}${record.amount}
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${record.type === "income" ? "bg-emerald-500/20 text-emerald-700" : "bg-rose-500/20 text-rose-700"}`}
                      >
                        {record.type === "income" ? "收入" : "支出"}
                      </span>
                      <p className="text-sm text-foreground">{record.desc}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(record.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            {/* 小計 */}
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-lg font-semibold">小計</span>
              <span
                className={`text-xl font-bold ${subTotal() >= 0 ? "text-emerald-600" : "text-rose-600"}`}
              >
                ${subTotal().toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

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
