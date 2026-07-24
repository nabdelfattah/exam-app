export interface ResetPasswordReq {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRes {
  message: string;
}
