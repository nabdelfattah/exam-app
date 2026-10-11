const baseUrl = 'https://exam-app.elevate-bootcamp.cloud' as const;

export default class AuthEndPoints {
  static readonly LOGIN = 'auth/login';
  static readonly REGISTER = 'auth/register';
  static readonly VERIFY_EMAIL = 'auth/send-email-verification';
  static readonly CONFIRM_EMAIL = 'auth/confirm-email-verification';
  static readonly FORGET_PASSWORD = 'auth/forgot-password';
  static readonly RESET_PASSWORD = 'auth/reset-password';
}
