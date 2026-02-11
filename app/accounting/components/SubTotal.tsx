"use-client";

interface RecordSubTotalProps {
  total: number;
}

export function RecordSubTotal({ total }: RecordSubTotalProps) {
  return (
    <div className="mt-4 flex items-center justify-between border-t pt-4">
      <span className="text-lg font-semibold">小計</span>
      <span className={`text-xl font-bold ${total >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
        ${total.toLocaleString()}
      </span>
    </div>
  );
}
