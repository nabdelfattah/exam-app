import { inject, Injectable } from '@angular/core';
import AuthApi from '../base/auth-api';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import AuthEndPoints from '../enum/auth-end-points';
import { AuthAdaptorService } from '../adaptor/auth-adaptor.service';
import { map } from 'rxjs';
import { LoginReq, LoginRes, LoginRowRes } from '../interfaces/login.interface';
import { VerifyEmailReq, VerifyEmailRes } from '../interfaces/verify-email.interface';
import { RegisterReq, RegisterRes, RegisterRowRes } from '../interfaces/register.interface';
import { ConfirmEmailReq, ConfirmEmailRes } from '../interfaces/confirm-email.interface';
import { ForgetPasswordReq, ForgetPasswordRes } from '../interfaces/forget-password.interface';
import { ResetPasswordReq, ResetPasswordRes } from '../interfaces/reset-password.interface';
import { IAM_AUTH_CONFIG } from '../config/iam-auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthApi {
  private readonly httpClient = inject(HttpClient);
  private readonly authAdaptorService = inject(AuthAdaptorService);
  private readonly config = inject(IAM_AUTH_CONFIG);

  verifyEmail(data: VerifyEmailReq): Observable<VerifyEmailRes> {
    return this.httpClient.post<VerifyEmailRes>(
      this.config.baseUrl + AuthEndPoints.VERIFY_EMAIL,
      data,
    );
  }

  confirmEmail(data: ConfirmEmailReq): Observable<ConfirmEmailRes> {
    return this.httpClient.post<ConfirmEmailRes>(
      this.config.baseUrl + AuthEndPoints.CONFIRM_EMAIL,
      data,
    );
  }

  register(data: RegisterReq): Observable<RegisterRes> {
    return this.httpClient
      .post<RegisterRowRes>(this.config.baseUrl + AuthEndPoints.REGISTER, data)
      .pipe(map((res: RegisterRowRes) => this.authAdaptorService.adapt(res)));
  }

  login(data: LoginReq): Observable<LoginRes> {
    return this.httpClient
      .post<LoginRowRes>(this.config.baseUrl + AuthEndPoints.LOGIN, data)
      .pipe(map((res: LoginRowRes) => this.authAdaptorService.adapt(res)));
  }

  forgetPassword(data: ForgetPasswordReq): Observable<ForgetPasswordRes> {
    return this.httpClient.post<ForgetPasswordRes>(
      this.config.baseUrl + AuthEndPoints.FORGET_PASSWORD,
      data,
    );
  }

  resetPassword(data: ResetPasswordReq): Observable<ResetPasswordRes> {
    return this.httpClient.post<ResetPasswordRes>(
      this.config.baseUrl + AuthEndPoints.RESET_PASSWORD,
      data,
    );
  }
}
