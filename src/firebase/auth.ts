import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
} from 'firebase/auth';
import app from './config';

// Lấy instance của Firebase Auth (singleton)
const auth = getAuth(app);

// Google Provider — dùng để đăng nhập bằng tài khoản Google
const googleProvider = new GoogleAuthProvider();

/**
 * Đăng nhập bằng Google qua popup.
 * Trả về thông tin user nếu thành công.
 * Ném lỗi nếu người dùng đóng popup hoặc có vấn đề.
 */
export const signInWithGoogle = async (): Promise<User> => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

/**
 * Đăng xuất khỏi Firebase.
 */
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

/**
 * Lắng nghe thay đổi trạng thái đăng nhập.
 * Firebase tự động gọi callback khi user đăng nhập hoặc đăng xuất.
 * Trả về hàm unsubscribe để dừng lắng nghe khi không cần nữa.
 *
 * @param callback - Hàm nhận User (đã đăng nhập) hoặc null (chưa đăng nhập)
 */
export const onAuthStateChange = (
  callback: (user: User | null) => void
): Unsubscribe => {
  return onAuthStateChanged(auth, callback);
};
