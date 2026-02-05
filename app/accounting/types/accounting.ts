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
  id: number;
  type: RecordType;
  amount: number;
  desc: string;
}
