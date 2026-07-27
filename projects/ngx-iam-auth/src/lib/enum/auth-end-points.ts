const baseUrl = 'https://exam-app.elevate-bootcamp.cloud' as const;

export default class AuthEndPoints {
  static readonly LOGIN = `${baseUrl}/api/auth/login`;
  static readonly REGISTER = `${baseUrl}/api/auth/register`;
  static readonly VERIFY_EMAIL = `${baseUrl}/api/auth/send-email-verification`;
  static readonly CONFIRM_EMAIL = `${baseUrl}/api/auth/confirm-email-verification`;
  static readonly FORGET_PASSWORD = `${baseUrl}/api/auth/forgot-password`;
  static readonly RESET_PASSWORD = `${baseUrl}/api/auth/reset-password`;
}
