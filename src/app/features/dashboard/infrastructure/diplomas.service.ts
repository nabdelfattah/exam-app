import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Diploma, DiplomasRes } from '../domain/diploma.interface';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {
  private readonly httpClient = inject(HttpClient);

  getDiplomas(): Observable<Diploma[]> {
    return this.httpClient
      .get<DiplomasRes>(`${environment.baseUrl}diplomas?page=1&limit=12`)
      .pipe(map((res) => res.payload.data));
  }
}
