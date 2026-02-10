import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  UserCredential,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "./config";

// 註冊
export async function registerWithEmail(
  email: string,
  password: string,
  name: string,
): Promise<FirebaseUser> {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(userCredential.user, { displayName: name });

    return userCredential.user;
  } catch (error) {
    const err = error as FirebaseError;
    if (err.code === "auth/email-already-in-use") {
      throw new Error("此 Email 已被註冊");
    } else if (err.code === "auth/weak-password") {
      throw new Error("密碼至少需要 6 字元");
    } else if (err.code === "auth/invalid-email") {
      throw new Error("Email 格式不正確");
    } else {
      throw new Error("註冊失敗：" + err.message);
    }
  }
}

// 登入
export async function loginWithEmail(email: string, password: string): Promise<FirebaseUser> {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);

    return userCredential.user;
  } catch (error) {
    const err = error as FirebaseError;
    if (err.code === "auth/user-not-found") {
      throw new Error("此 Email 尚未註冊");
    } else if (err.code === "auth/wrong-password") {
      throw new Error("密碼錯誤");
    } else if (err.code === "auth/invalid-email") {
      throw new Error("Email 格式不正確");
    } else if (err.code === "auth/invalid-credential") {
      throw new Error("Email 或密碼錯誤");
    } else {
      throw new Error("登入失敗：" + err.message);
    }
  }
}

// 登出
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    const err = error as FirebaseError;
    throw new Error("登出失敗：" + err.message);
  }
}

// 取得當前使用者
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}

// 匯出監聽函式
export const onAuthStateChanged = firebaseOnAuthStateChanged;
export { auth };
