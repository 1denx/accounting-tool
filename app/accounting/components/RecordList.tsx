"use-client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Record } from "../types/accounting";
import { RecordItem } from "./RecordItem";
import { RecordSubTotal } from "./SubTotal";

interface RecordListProps {
  records: Record[];
  onDelete: (id: string) => void;
  total: number;
}

export function RecordList({ records, onDelete, total }: RecordListProps) {
  return (
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
              <RecordItem key={record.id} record={record} onDelete={onDelete} />
            ))}
          </ul>
        )}
        {/* 小計 */}
        <RecordSubTotal total={total} />
      </CardContent>
    </Card>
  );
}
