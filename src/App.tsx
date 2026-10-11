import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// Loading toàn trang — hiển thị khi Firebase đang kiểm tra session
const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="spinner" aria-label="Đang tải..." />
    <p>Đang kiểm tra đăng nhập...</p>
  </div>
);

function App() {
  const { user, loading } = useAuth();

  // Chờ Firebase xác nhận trạng thái trước khi render
  if (loading) return <LoadingScreen />;

  // Đã đăng nhập → Dashboard | Chưa đăng nhập → Login
  return user ? <DashboardPage /> : <LoginPage />;
}

export default App;
