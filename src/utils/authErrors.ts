/**
 * Chuyển đổi mã lỗi Firebase Authentication thành thông báo tiếng Việt dễ hiểu.
 */

// Các mã lỗi người dùng tự đóng popup — không cần hiển thị thông báo
const SILENT_ERRORS = new Set([
  'auth/popup-closed-by-user',
  'auth/cancelled-popup-request',
]);

const ERROR_MESSAGES: Record<string, string> = {
  'auth/popup-blocked':
    'Popup bị trình duyệt chặn. Vui lòng cho phép popup cho trang này rồi thử lại.',
  'auth/account-exists-with-different-credential':
    'Email này đã được liên kết với phương thức đăng nhập khác (Google hoặc Facebook). Vui lòng dùng đúng phương thức.',
  'auth/network-request-failed':
    'Lỗi kết nối mạng. Vui lòng kiểm tra internet rồi thử lại.',
  'auth/too-many-requests':
    'Quá nhiều lần thử. Vui lòng chờ một lúc rồi thử lại.',
  'auth/user-disabled':
    'Tài khoản này đã bị vô hiệu hóa. Vui lòng liên hệ hỗ trợ.',
  'auth/operation-not-allowed':
    'Phương thức đăng nhập này chưa được kích hoạt. Vui lòng kiểm tra cấu hình Firebase.',
  'auth/invalid-api-key':
    'Cấu hình Firebase không hợp lệ. Vui lòng kiểm tra biến môi trường.',
  'auth/unauthorized-domain':
    'Domain này chưa được phép trong Firebase Console. Vui lòng thêm vào Authorized Domains.',
};

/**
 * Trả về thông báo lỗi tiếng Việt.
 * Trả về null nếu lỗi là do người dùng tự đóng popup (không cần hiển thị).
 */
export const getAuthErrorMessage = (error: unknown): string | null => {
  if (!(error instanceof Error)) {
    return 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.';
  }

  const code = (error as { code?: string }).code ?? '';

  // Lỗi im lặng — không hiển thị gì
  if (SILENT_ERRORS.has(code)) return null;

  // Lỗi đã biết — hiển thị thông báo thân thiện
  if (ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];

  // Lỗi chưa biết — hiển thị message gốc
  return error.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
};
