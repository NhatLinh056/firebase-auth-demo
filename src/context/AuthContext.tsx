import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type User } from 'firebase/auth';
import { onAuthStateChange } from '../firebase/auth';

// --- Kiểu dữ liệu ---

interface AuthContextType {
  user: User | null;       // null = chưa đăng nhập
  loading: boolean;        // true = Firebase đang kiểm tra session
}

// --- Tạo Context ---

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// --- Provider: bọc toàn bộ app để chia sẻ trạng thái ---

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // bắt đầu là true vì chưa biết trạng thái

  useEffect(() => {
    // Đăng ký lắng nghe — Firebase tự gọi callback khi trạng thái thay đổi
    const unsubscribe = onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false); // đã biết trạng thái → tắt loading
    });

    // Cleanup: hủy lắng nghe khi component bị unmount (tránh memory leak)
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Custom hook: dùng trong mọi component ---

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
