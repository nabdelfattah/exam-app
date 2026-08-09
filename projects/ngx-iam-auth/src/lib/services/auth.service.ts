import { inject, Injectable } from '@angular/core';
import AuthApi from '../base/auth-api';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import AuthEndPoints from '../enum/auth-end-points';
import { AuthAdaptorService } from '../adaptor/auth-adaptor.service';
import { map } from 'rxjs';
import { LoginReq, LoginRes } from '../interfaces/login.interface';
import { VerifyEmailReq, VerifyEmailRes } from '../interfaces/verify-email.interface';
import { RegisterReq, RegisterRes } from '../interfaces/register.interface';
import { ConfirmEmailReq, ConfirmEmailRes } from '../interfaces/confirm-email.interface';
import { ForgetPasswordReq, ForgetPasswordRes } from '../interfaces/forget-password.interface';
import { ResetPasswordReq, ResetPasswordRes } from '../interfaces/reset-password.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthApi {
  private readonly httpClient = inject(HttpClient);
  private readonly authAdaptorService = inject(AuthAdaptorService);

  register(data: RegisterReq): Observable<RegisterRes> {
    return this.httpClient
      .post<RegisterRes>(AuthEndPoints.REGISTER, data)
      .pipe(map((res: any) => this.authAdaptorService.adapt(res)));
  }

  login(data: LoginReq): Observable<LoginRes> {
    return this.httpClient
      .post<LoginRes>(AuthEndPoints.LOGIN, data)
      .pipe(map((res: any) => this.authAdaptorService.adapt(res)));
  }

  verifyEmail(data: VerifyEmailReq): Observable<VerifyEmailRes> {
    return this.httpClient.post<VerifyEmailRes>(AuthEndPoints.VERIFY_EMAIL, data);
  }

  confirmEmail(data: ConfirmEmailReq): Observable<ConfirmEmailRes> {
    return this.httpClient.post<ConfirmEmailRes>(AuthEndPoints.CONFIRM_EMAIL, data);
  }

  forgetPassword(data: ForgetPasswordReq): Observable<ForgetPasswordRes> {
    return this.httpClient.post<ForgetPasswordRes>(AuthEndPoints.FORGET_PASSWORD, data);
  }

  resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes> {
    return this.httpClient.post<ResetPasswordRes>(AuthEndPoints.RESET_PASSWORD, data);
  }
}
