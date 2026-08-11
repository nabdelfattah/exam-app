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
  message?: string;
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

export interface OtpPayload {
  code: string;
}

export interface VerifyEmailPayload {
  newEmail: string;
}

export interface VerifyEmailRes {
  message: string;
  code: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface changePasswordRes {
  message: string;
}

export interface DeleteAccountRes {
  message: string;
}
