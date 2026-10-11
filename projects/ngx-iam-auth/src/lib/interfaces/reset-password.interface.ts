export interface ResetPasswordReq {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRes {
  status: boolean;
  code: number;
  message: string;
}
