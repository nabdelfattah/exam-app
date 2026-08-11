import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ChangePasswordPayload,
  changePasswordRes,
  OtpPayload,
  UpdateUserPayload,
  User,
  UserRes,
  VerifyEmailPayload,
  VerifyEmailRes,
} from '../domain/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly httpClient = inject(HttpClient);

  getUser(): Observable<User> {
    return this.httpClient
      .get<UserRes>(`${environment.baseUrl}users/profile`)
      .pipe(map((res) => res.payload.user));
  }

  updateUser(payload: UpdateUserPayload): Observable<User> {
    return this.httpClient
      .patch<UserRes>(`${environment.baseUrl}users/profile`, payload)
      .pipe(map((res) => res.payload.user));
  }

  verifyEmail(payload: VerifyEmailPayload) {
    return this.httpClient.post<VerifyEmailRes>(
      `${environment.baseUrl}users/email/request`,
      payload,
    );
  }

  confirmEmail(payload: OtpPayload): Observable<UserRes> {
    return this.httpClient.post<UserRes>(`${environment.baseUrl}users/email/confirm`, payload);
  }

  changePassword(payload: ChangePasswordPayload): Observable<changePasswordRes> {
    return this.httpClient.post<changePasswordRes>(
      `${environment.baseUrl}users/change-password`,
      payload,
    );
  }
}
