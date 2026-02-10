export function validateName(name: string): { isValid: boolean; error?: string } {
  if (name.trim() === "") {
    return { isValid: false, error: "請輸入姓名" };
  }

  if (name.length < 2) {
    return { isValid: false, error: "姓名至少需要 2 個字元" };
  }

  if (name.length > 50) {
    return { isValid: false, error: "姓名不能超過 50 個字元" };
  }
  return { isValid: true };
}

export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (email.trim() === "") {
    return { isValid: false, error: "請輸入 Email" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Email 格式不正確" };
  }
  return { isValid: true };
}

export function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (password.trim() === "") {
    return { isValid: false, error: "請輸入密碼" };
  }

  if (password.length < 6) {
    return { isValid: false, error: "密碼至少需要 6 個字元" };
  }

  return { isValid: true };
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): { isValid: boolean; error?: string } {
  if (confirmPassword.trim() === "") {
    return { isValid: false, error: "請輸入確認密碼" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: "兩次輸入的密碼不一致" };
  }

  return { isValid: true };
}

export function validateLoginForm(
  email: string,
  password: string,
): { isValid: boolean; errors: { email?: string; password?: string } } {
  const errors: { email?: string; password?: string } = {};
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

export function validateRegisterForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
): {
  isValid: boolean;
  errors: { name?: string; email?: string; password?: string; confirmPassword?: string };
} {
  const errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

  const nameValidation = validateName(name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error;
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.error;
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}
