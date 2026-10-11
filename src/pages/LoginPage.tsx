import { useState } from 'react';
import { signInWithGoogle, signInWithFacebook } from '../firebase/auth';

// SVG logo Google inline — không cần file ảnh ngoài
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// SVG logo Facebook inline
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="#fff">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const LoginPage = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoading = loadingGoogle || loadingFacebook;

  const handleError = (err: unknown) => {
    if (err instanceof Error && (err as { code?: string }).code === 'auth/popup-closed-by-user') {
      return; // Người dùng tự đóng popup → không báo lỗi
    }
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoadingFacebook(true);
    setError(null);
    try {
      await signInWithFacebook();
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoadingFacebook(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        {/* Badge */}
        <div style={{ textAlign: 'center' }}>
          <span className="app-badge">
            <span className="app-badge-dot" />
            Firebase Auth Demo
          </span>
        </div>

        {/* Tiêu đề */}
        <h1 className="login-title" style={{ textAlign: 'center' }}>
          Chào mừng trở lại
        </h1>
        <p className="login-subtitle" style={{ textAlign: 'center' }}>
          Đăng nhập để xem thông tin tài khoản của bạn
        </p>

        {/* Nút Google */}
        <button
          id="btn-google-login"
          className="btn btn-google"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          type="button"
        >
          {loadingGoogle ? (
            <span className="spinner spinner-dark" aria-hidden="true" />
          ) : (
            <GoogleIcon />
          )}
          {loadingGoogle ? 'Đang đăng nhập...' : 'Tiếp tục với Google'}
        </button>

        <div className="divider">hoặc</div>

        {/* Nút Facebook */}
        <button
          id="btn-facebook-login"
          className="btn btn-facebook"
          onClick={handleFacebookLogin}
          disabled={isLoading}
          type="button"
        >
          {loadingFacebook ? (
            <span className="spinner" aria-hidden="true" />
          ) : (
            <FacebookIcon />
          )}
          {loadingFacebook ? 'Đang đăng nhập...' : 'Tiếp tục với Facebook'}
        </button>

        {/* Thông báo lỗi */}
        {error && (
          <div className="error-box" role="alert">
            ⚠️ {error}
          </div>
        )}

        {/* Footer */}
        <p className="login-footer">
          STEP 2 — Thực hành Firebase Authentication
          <br />
          Google Login · Facebook Login
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
