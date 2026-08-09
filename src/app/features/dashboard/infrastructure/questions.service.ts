import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Question } from '@app/features/dashboard/domain/question.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private readonly httpClient = inject(HttpClient);

  getQuestions(id: string): Observable<Question[]> {
    return this.httpClient
      .get<any>(`${environment.baseUrl}questions/exam/${id}`)
      .pipe(map((res) => res.payload.questions));
  }
}
