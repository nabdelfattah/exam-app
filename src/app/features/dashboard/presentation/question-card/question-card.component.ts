import { Component, input, model, signal } from '@angular/core';
import { Question } from '../../domain/question.interface';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-card',
  imports: [RadioButtonModule, FormsModule],
  templateUrl: './question-card.component.html',
})
export class QuestionCardComponent {
  question = input<Question>();
  selectedAnswer = model('');

  ngOnInit() {
    console.log(this.question()?.answers);
  }
}
