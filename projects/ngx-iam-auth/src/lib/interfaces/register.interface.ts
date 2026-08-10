export interface RegisterReq {
  username: 'test';
  email: 'n.wael.202@gmail.com.com';
  password: 'string';
  confirmPassword: 'string';
  firstName: 'string';
  lastName: 'string';
  phone: 'string';
}

export interface RegisterRes {
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  role: string;
  token: string;
}
