import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../firebase/auth';

// Icon provider
const getProviderLabel = (providerId: string): string => {
  switch (providerId) {
    case 'google.com': return '🔵 Google';
    case 'facebook.com': return '🔷 Facebook';
    case 'password': return '📧 Email/Password';
    default: return providerId;
  }
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  if (!user) return null; // guard — App.tsx đã đảm bảo chỉ render khi có user

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      // AuthContext tự cập nhật → App.tsx tự chuyển về LoginPage
    } catch (err) {
      console.error('Logout error:', err);
      setLoggingOut(false);
    }
  };

  // Lấy provider đầu tiên (thường chỉ có 1)
  const provider = user.providerData[0]?.providerId ?? 'unknown';

  // Lấy chữ cái đầu tên để làm avatar placeholder
  const initials = user.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user.email?.charAt(0).toUpperCase() ?? '?';

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <span className="dashboard-brand-dot" />
          Firebase Auth Demo
        </div>
        <button
          id="btn-logout"
          className="btn btn-logout"
          onClick={handleLogout}
          disabled={loggingOut}
          type="button"
        >
          {loggingOut ? (
            <>
              <span className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
              Đang đăng xuất...
            </>
          ) : (
            'Đăng xuất'
          )}
        </button>
      </header>

      {/* Nội dung chính */}
      <main className="dashboard-content">
        <div className="dashboard-welcome">
          <h1>Xin chào, {user.displayName ?? 'bạn'} 👋</h1>
          <p>Bạn đã đăng nhập thành công qua {getProviderLabel(provider)}</p>
        </div>

        {/* Card thông tin user */}
        <div className="user-card" role="region" aria-label="Thông tin tài khoản">
          {/* Avatar + tên */}
          <div className="user-card-header">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={`Ảnh của ${user.displayName}`}
                className="user-avatar"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="user-avatar-placeholder" aria-hidden="true">
                {initials}
              </div>
            )}
            <div>
              <p className="user-name">{user.displayName ?? '(Chưa có tên)'}</p>
              <p className="user-email-label">{user.email}</p>
            </div>
          </div>

          {/* Chi tiết */}
          <dl className="info-list">
            <div className="info-row">
              <dt className="info-label">UID</dt>
              <dd className="info-value">
                <code>{user.uid}</code>
              </dd>
            </div>

            <div className="info-row">
              <dt className="info-label">Display Name</dt>
              <dd className="info-value">{user.displayName ?? '(trống)'}</dd>
            </div>

            <div className="info-row">
              <dt className="info-label">Email</dt>
              <dd className="info-value">{user.email ?? '(trống)'}</dd>
            </div>

            <div className="info-row">
              <dt className="info-label">Photo URL</dt>
              <dd className="info-value">
                {user.photoURL ? (
                  <a
                    href={user.photoURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent)', fontSize: 13 }}
                  >
                    Xem ảnh ↗
                  </a>
                ) : '(không có)'}
              </dd>
            </div>

            <div className="info-row">
              <dt className="info-label">Provider</dt>
              <dd className="info-value">
                <span className="provider-badge">
                  {getProviderLabel(provider)}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
