# Accounting

這是一個簡單實用的網頁應用程序，用於記錄每日支出和收入。使用 React 及 Next.js 作為前端框架，並整合了 Google Firebase 服務進行會員帳號驗證以及資料存取。

## 測試

|              |     帳號      |  密碼  |
| :----------: | :-----------: | :----: |
| Test Account | test@test.com | 123456 |

## 主要功能

- 使用者驗證：使用 Firebase 驗證進行安全登入和登出，保護個人數據。
- 支出與收入追蹤：透過互動式表單添加記錄，包含類型、金額和描述。
- 即時記錄列表：利用即時 Firestore 監聽器自動顯示更新記錄，包含計算和刪除功能。
- 響應式佈局：簡潔、適用於手機的介面，便於在不同裝置上使用。

## 使用技術

**前端框架與核心**

- Next.js (App Router)
- React
- TypeScript

**UI 與樣式**

- Tailwind CSS
- shadcn/ui
- Lucide React

**後端與資料庫**

- Firebase Firestore
- Firebase Authentication

**工具與部署**

- 版本控制：Git + GitHub
- 部署平台：Vercel
- 程式碼規範：ESLint + Prettier

## 環境變數設定

請自行建立一份 `.env.local` 檔案

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

## 安裝與啟動

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 程式碼格式化與檢查
npm run format
npm run lint
```
