export interface ConfirmEmailReq {
  email: string;
  code: string;
}

export interface ConfirmEmailRes {
  message: string;
}
