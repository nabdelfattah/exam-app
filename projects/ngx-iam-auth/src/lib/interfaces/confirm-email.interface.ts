export interface ConfirmEmailReq {
  email: string;
  code: string;
}

export interface ConfirmEmailRes {
  status: boolean;
  code: number;
  message: string;
}
