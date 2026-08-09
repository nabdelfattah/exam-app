import { Component, input } from '@angular/core';
import { Exam } from '@app/features/dashboard/domain/exam.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-card',
  imports: [RouterLink],
  templateUrl: './exam-card.component.html',
})
export class ExamCardComponent {
  data = input<Exam>();
}
