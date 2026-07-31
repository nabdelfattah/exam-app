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
import { CircularProgressComponent } from '../circular-progress/circular-progress.component';
import { label } from '@primeng/themes/aura/metergroup';
import { MenuItem } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-questions',
  imports: [
    EmptyStateComponent,
    TitleComponent,
    BreadcrumbRouterDemo,
    CircularProgressComponent,
    ProgressBarModule,
    QuestionCardComponent,
    ButtonModule,
  ],
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

  examTitle = signal<string>('');
  diplomaTitle = signal<string>('');
  timeLeft = '5.2';
  progressPercent = signal<number>(50);

  items: MenuItem[] = [];

  ngOnInit() {
    // get question, exam title and diploma title
    this.questionService
      .getQuestions(this.id())
      .pipe(
        tap((questions) => {
          console.log(questions);
          this.questionsList.set(questions);
        }),
        switchMap((questions) => {
          return this.examService.getExamById(questions[0].examId);
        }),
      )
      .subscribe({
        next: (res: Exam) => {
          this.examTitle.set(res.title);
          this.diplomaTitle.set(res.diploma.title);
          this.items = [
            { label: 'Diplomas', routerLink: '/diplomas/diplomas' },
            { label: `${this.diplomaTitle() || ''}` },
            { label: `${this.examTitle() || ''}` },
          ];
        },
        error: () => {},
      });
  }

  goBack() {
    this.location.back();
  }

  goPrevious() {}

  goNext() {}

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
