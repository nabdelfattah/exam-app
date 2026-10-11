export interface ForgetPasswordReq {
  email: string;
  redirectUrl: string;
}

export interface ForgetPasswordRes {
  status: boolean;
  code: number;
  message: string;
}

// {
//   "status": false,
//   "code": 400,
//   "message": "Validation failed",
//   "errors": [
//     {
//       "path": "redirectUrl",
//       "message": "Invalid URL"
//     }
//   ]
// }
