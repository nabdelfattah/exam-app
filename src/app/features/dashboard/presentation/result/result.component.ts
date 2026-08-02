import { SubmissionPayload } from './../../domain/exam-submission.interface';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.component.html',
})
export class ResultComponent {
  data = input<SubmissionPayload>();

  ngOnChange() {
    console.log(this.data());
  }
}
