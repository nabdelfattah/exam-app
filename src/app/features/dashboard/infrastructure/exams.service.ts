import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Exam } from '@app/features/dashboard/domain/exam.interface';
import { id } from 'intl-tel-input/locale';
import { ExamSubmission } from '../domain/exam-submission.interface';

@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  private readonly httpClient = inject(HttpClient);

  getExams(id: string): Observable<Exam[]> {
    return this.httpClient
      .get<any>(`${environment.baseUrl}exams?diplomaId=${id}`)
      .pipe(map((res) => res.payload.data));
  }

  getExamById(id: string): Observable<Exam> {
    return this.httpClient
      .get<any>(`${environment.baseUrl}exams/${id}`)
      .pipe(map((res) => res.payload.exam));
  }

  submitExam(data: ExamSubmission): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}submissions`, data);
  }
}
