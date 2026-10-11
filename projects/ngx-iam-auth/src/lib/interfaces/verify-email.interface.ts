export interface VerifyEmailReq {
  email: string;
}

export interface VerifyEmailRes {
  status: boolean;
  code: number;
  message: string;
}
