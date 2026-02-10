"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { addRecord, deleteRecord, subscribeToRecords } from "@/lib/firebase/firestore";
import type { RecordType, Record } from "../types/accounting";

// 集中管理所有收支記錄相關的狀態和邏輯
export function useAccounting() {
  const { user } = useAuth();
  const [records, setRecords] = useState<Record[]>([]);
  // 初始值根據 user 是否存在來決定
  const [isLoading, setIsLoading] = useState(!!user);
  const [prevUserId, setPrevUserId] = useState<string | undefined>(user?.uid);

  if (user?.uid !== prevUserId) {
    setPrevUserId(user?.uid);
    setRecords([]);
    setIsLoading(!!user?.uid); // 如果有新的 uid 則設為 true，否則設為 false
  }

  useEffect(() => {
    const userId = user?.uid;
    if (!userId) return;

    // 建立 Firestore 監聽器
    // subscribeToRecords 會回傳一個取消監聽的函式
    const unsubscribe = subscribeToRecords(user.uid, newRecords => {
      // 當資料變化時，這個 callback 會被呼叫
      setRecords(newRecords);
      setIsLoading(false);
    });

    // 清理函式：組件卸載時取消監聽
    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  // 新增
  const handleAdd = async (type: RecordType, amount: number, desc: string): Promise<void> => {
    if (!user) {
      throw new Error("請先登入");
    }

    try {
      await addRecord(user.uid, type, amount, desc);
    } catch (error) {
      console.error("新增記錄失敗：", error);
      alert("新增記錄失敗，請稍後再試");
      throw error;
    }
  };

  // 刪除
  const handleDelete = async (id: string): Promise<void> => {
    if (!user) {
      throw new Error("請先登入");
    }
    try {
      await deleteRecord(user.uid, id);
    } catch (error) {
      console.error("刪除記錄失敗：", error);
      alert("刪除記錄失敗，請稍後再試");
      throw error;
    }
  };

  // 小計
  // 使用 useMemo 處理計算邏輯，避免每次元件重新渲染都重新計算總額，只有 records 變動才計算
  const totalBalance = useMemo(() => {
    return records.reduce((total, record) => {
      return record.type === "income" ? total + record.amount : total - record.amount;
    }, 0);
  }, [records]);

  return {
    records,
    isLoading,
    handleAdd,
    handleDelete,
    subTotal: totalBalance,
  };
}
