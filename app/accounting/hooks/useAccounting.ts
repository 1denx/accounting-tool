"use client";

import { useState } from "react";
import type { RecordType, Record } from "../types/accounting";

// 集中管理所有收支記錄相關的狀態和邏輯
export function useAccounting() {
  // 狀態管理
  const [records, setRecords] = useState<Record[]>([]);

  // 新增
  const handleAdd = (type: RecordType, amount: number, desc: string): void => {
    // 建立新記錄
    const newRecord: Record = {
      id: Date.now(),
      type,
      amount,
      desc,
    };

    // 更新 record 狀態，把新加入的資料加到現有陣列的前面
    setRecords([newRecord, ...records]);
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

  return {
    records,
    handleAdd,
    handleDelete,
    subTotal,
  };
}
