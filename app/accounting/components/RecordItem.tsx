"use-client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Record } from "../types/accounting";

interface RecordItemProps {
  record: Record;
  onDelete: (id: number) => void;
}

export function RecordItem({ record, onDelete }: RecordItemProps) {
  return (
    <li className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3 flex-1">
        {/* 金額顯示 */}
        <p
          className={`text-xl font-bold ${record.type === "income" ? "text-emerald-600" : "text-rose-600"}`}
        >
          {record.type === "income" ? "+" : "-"}${record.amount}
        </p>
        {/* 收支標籤 */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${record.type === "income" ? "bg-emerald-500/20 text-emerald-700" : "bg-rose-500/20 text-rose-700"}`}
        >
          {record.type === "income" ? "收入" : "支出"}
        </span>
        {/* 細項描述 */}
        <p className="text-sm text-foreground">{record.desc}</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(record.id)}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </li>
  );
}
