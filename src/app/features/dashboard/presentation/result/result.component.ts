import { SubmissionPayload } from './../../domain/exam-submission.interface';
import { Component, computed, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-result',
  imports: [ChartModule],
  templateUrl: './result.component.html',
})
export class ResultComponent {
  data = input<SubmissionPayload>();

  chartData = computed(() => ({
    datasets: [
      {
        data: [
          this.data()?.payload?.submission?.correctAnswers,
          this.data()?.payload?.submission?.wrongAnswers,
        ],
        backgroundColor: ['#10B981', '#EF4444'],
        hoverBackgroundColor: ['#10B981', '#EF4444'],
        borderWidth: 0,
      },
    ],
  }));

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: '65%',
  };
}
