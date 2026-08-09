import { Observable } from 'rxjs';
import { RegisterReq, RegisterRes } from '../interfaces/register.interface';
import { LoginReq, LoginRes } from '../interfaces/login.interface';
import { VerifyEmailReq, VerifyEmailRes } from '../interfaces/verify-email.interface';
import { ConfirmEmailReq, ConfirmEmailRes } from '../interfaces/confirm-email.interface';
import { ForgetPasswordReq, ForgetPasswordRes } from '../interfaces/forget-password.interface';
import { ResetPasswordReq, ResetPasswordRes } from '../interfaces/reset-password.interface';

export default abstract class AuthApi {
  abstract register(data: RegisterReq): Observable<RegisterRes>;
  abstract login(data: LoginReq): Observable<LoginRes>;
  abstract verifyEmail(data: VerifyEmailReq): Observable<VerifyEmailRes>;
  abstract confirmEmail(data: ConfirmEmailReq): Observable<ConfirmEmailRes>;
  abstract forgetPassword(data: ForgetPasswordReq): Observable<ForgetPasswordRes>;
  abstract resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes>;
}
