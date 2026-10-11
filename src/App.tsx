import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';

// DashboardPage sẽ được tạo ở TODO 09
// Tạm thời dùng placeholder để kiểm thử Login trước
const DashboardPlaceholder = () => (
  <div className="page-center">
    <div className="card" style={{ textAlign: 'center' }}>
      <p style={{ color: 'var(--accent)', fontSize: '48px', marginBottom: '16px' }}>✅</p>
      <h1 className="login-title">Đăng nhập thành công!</h1>
      <p className="login-subtitle">
        Dashboard sẽ được xây dựng ở TODO 09.
      </p>
    </div>
  </div>
);

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
  return user ? <DashboardPlaceholder /> : <LoginPage />;
}

export default App;
