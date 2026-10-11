export interface RegisterReq {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: string;
}

export interface RegisterRowRes {
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
      gender?: string;
      profilePhoto?: string;
      emailVerified: boolean;
      phoneVerified: boolean;
      role: string;
      createdAt: string;
      updatedAt?: string;
    };
    token: string;
  };
}
export interface RegisterRes {
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  gender?: string;
  role: string;
  token: string;
}
