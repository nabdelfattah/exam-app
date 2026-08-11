import { Component, inject, input, signal } from '@angular/core';
import { BreadcrumbRouterDemo } from '@/app/shared/components/breadcrumb/breadcrumb.component';
import { TitleComponent } from '@/app/shared/components/title/title.component';
import { Exam } from '@app/features/dashboard/domain/exam.interface';
import { ExamsService } from '@app/features/dashboard/infrastructure/exams.service';
import { ExamCardComponent } from '../exam-card/exam-card.component';
import { EmptyStateComponent } from '@/app/shared/components/empty-state/empty-state.component';
import { BackButtonComponent } from '@/app/shared/components/back-button/back-button.component';

@Component({
  selector: 'app-exams',
  imports: [
    BreadcrumbRouterDemo,
    TitleComponent,
    ExamCardComponent,
    EmptyStateComponent,
    BackButtonComponent,
  ],
  templateUrl: './exams.component.html',
})
export class ExamsComponent {
  private readonly examService = inject(ExamsService);

  id = input<string>(''); // auto-populated from :id
  examsList = signal<Exam[]>([]);

  items = [{ label: 'Diplomas', routerLink: '/diplomas' }, { label: 'Exams' }];

  ngOnInit() {
    this.examService.getExams(this.id()).subscribe({
      next: (res) => {
        this.examsList.set(res);
      },
      error: () => {},
    });
  }
}
