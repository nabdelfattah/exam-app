export interface User {
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
}

export interface UserRes {
  code: number;
  status: boolean;
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
  };
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
}
