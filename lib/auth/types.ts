// 使用者資料
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// 認證狀態
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
