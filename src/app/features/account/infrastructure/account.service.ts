import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UpdateUserPayload, User, UserRes } from '../domain/user.interface';

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
}
