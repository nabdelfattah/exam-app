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
export interface LoginRowRes {
  status: boolean;
  code: number;
  payload: {
    user: {
      id: string;
      username: string;
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      profilePhoto: string;
      emailVerified: boolean;
      phoneVerified: boolean;
      role: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}
