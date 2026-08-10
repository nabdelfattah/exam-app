import { LoginRes, LoginRowRes } from './login.interface';

export interface Adaptor {
  adapt(data: LoginRowRes): LoginRes;
}
