export interface VerifyEmailReq {
  email: string;
}

export interface VerifyEmailRes {
  message: string;
  code: string;
}
