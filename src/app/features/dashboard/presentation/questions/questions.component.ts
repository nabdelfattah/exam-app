import { Component, computed, inject, input, model, signal } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { ResultComponent } from '../result/result.component';
import { SubmissionPayload } from '../../domain/exam-submission.interface';

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
    ResultComponent,
    RouterLink,
  ],
  templateUrl: './questions.component.html',
})
export class QuestionsComponent {
  private readonly questionService = inject(QuestionsService);
  private readonly examService = inject(ExamsService);
  private location = inject(Location);

  id = input<string>(''); // exam id from param
  answerId = model<string>(''); // exam id from param

  questionsList = signal<Question[]>([]);
  currentIndex = signal(0);
  selectedAnswers = signal<ExamAnswer[]>([]);

  examTitle = signal<string>('');
  diplomaTitle = signal<string>('');
  timeLeft = '5.2';
  progressPercent = computed(() => {
    const total = this.questionsList().length;
    // we should not divide by zero
    if (total === 0) {
      return 0;
    }
    return (this.currentIndex() / total) * 100;
  });

  startedAt = signal<Date>(new Date());
  resultData = signal<SubmissionPayload>({} as SubmissionPayload);

  items: MenuItem[] = [];

  ngOnInit() {
    // get question, exam title and diploma title
    this.questionService
      .getQuestions(this.id())
      .pipe(
        tap((questions) => {
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

  goPrevious() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((prev) => prev - 1);
    }
  }

  goNext() {
    if (this.answerId()) {
      // append {questionId: answerId} to the answers list and update localstorage
      const questionId = this.questionsList()[this.currentIndex()].id;
      const answerId = this.answerId();
      this.selectAnswer(questionId, answerId);
      // navigate to the next question or display result if exam ends
      if (this.currentIndex() + 1 == this.questionsList().length) {
        console.log('submit exam...');

        // submit the exam
        this.examService
          .submitExam({
            examId: this.id(),
            answers: this.selectedAnswers(),
            startedAt: this.startedAt().toISOString(),
          })
          .subscribe({
            next: (res: SubmissionPayload) => {
              this.resultData.set(res);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this.currentIndex.update((prev) => prev + 1);
      }
    }
  }

  restart() {
    this.currentIndex.set(0);
    this.selectedAnswers.set([]);
    this.startedAt.set(new Date());
  }

  selectAnswer(questionId: string, answerId: string) {
    // undate the selectedAnswers signal
    // for each object in the array search for the question id
    // if you find it (index not -1) update the record else add the record
    this.selectedAnswers.update((answers) => {
      const index = answers.findIndex((a) => a.questionId === questionId);
      if (index === -1) {
        // First answer for this question (add the record)
        return [...answers, { questionId, answerId }];
      } else {
        // update the existing record
        return answers.map((a) => (a.questionId === questionId ? { ...a, answerId } : a));
      }
    });
  }
}
