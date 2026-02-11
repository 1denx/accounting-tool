"use-client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RecordType } from "../types/accounting";
import { validateAmount, validateDesc } from "@/lib/validations";

interface RecordFormProps {
  onSubmit: (type: RecordType, amount: number, desc: string) => void;
}

export function RecordForm({ onSubmit }: RecordFormProps) {
  const [type, setType] = useState<RecordType>("expense");
  const [amount, setAmount] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  // 金額輸入處理
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    if (value === "") {
      setAmount("");
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setAmount(value);
    }
  };

  // 表單提交
  const handleSubmit = (): void => {
    const amountValidation = validateAmount(amount);
    if (!amountValidation.isValid) {
      alert(amountValidation.error);
      return;
    }

    const descValidation = validateDesc(desc);
    if (!descValidation.isValid) {
      alert(descValidation.error);
      return;
    }

    onSubmit(type, parseFloat(amount), desc);

    setAmount("");
    setDesc("");
  };

  return (
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
          placeholder="請輸入金額"
          value={amount}
          onChange={handleAmountChange}
          onKeyDown={e => {
            if (e.key === "-" || e.key === "+") {
              e.preventDefault();
            }
          }}
        />

        {/* 細項輸入 */}
        <Input
          type="text"
          placeholder="請輸入細項說明"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        {/* 新增按鈕 */}
        <Button className="w-full" onClick={handleSubmit}>
          <Plus className="mr-2 w-4 h-4" />
          新增
        </Button>
      </CardContent>
    </Card>
  );
}
