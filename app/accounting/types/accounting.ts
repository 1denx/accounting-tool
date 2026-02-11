// 型別定義
export type RecordType = "income" | "expense";

// 表單
export interface RecordFormData {
  type: RecordType;
  amount: string;
  desc: string;
}

// 記錄
export interface Record {
  id: string; // Firestore ID 是 string
  type: RecordType;
  amount: number;
  desc: string;
  createdAt: Date | null;
}
