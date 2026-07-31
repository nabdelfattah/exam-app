import { Component, inject, input, signal } from '@angular/core';
import { QuestionsService } from '@app/features/dashboard/infrastructure/questions.service';
import { ExamAnswer, Question } from '@app/features/dashboard/domain/question.interface';
import { Location } from '@angular/common';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { TitleComponent } from '@/app/shared/components/title/title.component';
import { BreadcrumbRouterDemo } from '@/app/shared/components/breadcrumb/breadcrumb.component';
import { switchMap, tap } from 'rxjs';
import { ExamsService } from '@app/features/dashboard/infrastructure/exams.service';
import { Exam } from '../../domain/exam.interface';

@Component({
  selector: 'app-questions',
  imports: [EmptyStateComponent, TitleComponent, BreadcrumbRouterDemo],
  templateUrl: './questions.component.html',
})
export class QuestionsComponent {
  private readonly questionService = inject(QuestionsService);
  private readonly examService = inject(ExamsService);
  private location = inject(Location);

  id = input<string>(''); // exam id from param

  questionsList = signal<Question[]>([]);
  currentIndex = signal(0);
  selectedAnswers = signal<ExamAnswer[]>([]);

  title = signal<string>('');

  items = [{ label: 'Diplomas', routerLink: '/diplomas/diplomas' }, { label: 'Exams' }];

  ngOnInit() {
    this.questionService
      .getQuestions(this.id())
      .pipe(
        tap((questions) => {
          console.log(questions);
          this.questionsList.set(questions);
        }),
        switchMap((questions) => {
          console.log(questions[0].examId);
          return this.examService.getExamById(questions[0].examId);
        }),
      )
      .subscribe({
        next: (res: Exam) => {
          this.title.set(res.title);
        },
        error: () => {},
      });
  }

  goBack() {
    this.location.back();
  }

  selectAnswer(questionId: string, answerId: string) {
    this.selectedAnswers.update((answers) => {
      const index = answers.findIndex((a) => a.questionId === questionId);

      if (index === -1) {
        // First answer for this question
        return [...answers, { questionId, answerId }];
      }

      // Update existing answer
      return answers.map((a) => (a.questionId === questionId ? { ...a, answerId } : a));
    });
  }
}
