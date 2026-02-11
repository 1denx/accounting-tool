import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { db } from "./config";
import { RecordType, Record } from "@/app/accounting/types/accounting";

// 新增紀錄
export async function addRecord(
  userId: string,
  type: RecordType,
  amount: number,
  desc: string,
): Promise<string> {
  try {
    const recordsRef = collection(db, "users", userId, "records");
    const docRef = await addDoc(recordsRef, {
      type,
      amount,
      desc,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    const err = error as FirebaseError;
    console.error("新增記錄失敗：", err);
    throw new Error("新增記錄失敗，請稍後再試");
  }
}

// 刪除記錄
export async function deleteRecord(userId: string, recordId: string): Promise<void> {
  try {
    const recordRef = doc(db, "users", userId, "records", recordId);
    await deleteDoc(recordRef);
  } catch (error) {
    const err = error as FirebaseError;
    console.error("刪除記錄失敗：", err);
    throw new Error("刪除記錄失敗，請稍後再試");
  }
}

// 監聽記錄的即時變化
export function subscribeToRecords(
  userId: string,
  callback: (records: Record[]) => void,
): () => void {
  const recordsRef = collection(db, "users", userId, "records");
  const q = query(recordsRef, orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(
    q,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const records: Record[] = snapshot.docs.map(doc => {
        const data = doc.data() as {
          type: RecordType;
          amount: number;
          desc: string;
          createdAt?: Timestamp;
        };

        return {
          id: doc.id,
          type: data.type,
          amount: data.amount,
          desc: data.desc,
          createdAt: data.createdAt?.toDate() ?? null,
        };
      });
      callback(records);
    },
    error => {
      console.error("監聽記錄失敗：", error);
    },
  );
  return unsubscribe;
}
