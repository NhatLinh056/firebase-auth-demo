import { initializeApp } from 'firebase/app';

// Cấu hình Firebase lấy từ biến môi trường Vite
// Giá trị thật nằm trong .env.local (không được commit)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Khởi tạo Firebase App (singleton — chỉ chạy một lần)
const app = initializeApp(firebaseConfig);

export default app;
