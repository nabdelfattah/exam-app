export interface ForgetPasswordReq {
  email: string;
  redirectUrl: string;
}

export interface ForgetPasswordRes {
  message: string;
  resetToken: string;
}
