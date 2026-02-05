/**
 * 驗證金額
 * @param amount - 要驗證的金額
 * @returns 驗證結果和錯誤訊息
 */

export function validateAmount(amount: string): {
  isValid: boolean;
  error?: string;
} {
  if (!amount || amount.trim() === "") {
    return { isValid: false, error: "請輸入金額" };
  }

  const numAmount = parseFloat(amount);

  if (isNaN(numAmount)) {
    return { isValid: false, error: "請輸入有效數字" };
  }

  if (numAmount <= 0) {
    return { isValid: false, error: "金額必須大於 0" };
  }

  return { isValid: true };
}

/**
 * 驗證描述
 * @param desc 要驗證的描述
 * @returns 驗證結果和錯誤訊息
 */
export function validateDesc(desc: string): {
  isValid: boolean;
  error?: string;
} {
  if (!desc || desc.trim() === "") {
    return { isValid: false, error: "請輸入細項說明" };
  }

  if (desc.length > 100) {
    return { isValid: false, error: "描述不能超過 100 字" };
  }

  return { isValid: true };
}
