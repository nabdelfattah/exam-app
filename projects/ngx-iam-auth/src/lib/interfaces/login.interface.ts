export interface LoginReq {
  username: string;
  password: string;
}
export interface LoginRes {
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  role: string;
  token: string;
}
