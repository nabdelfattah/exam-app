import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.html',
})
export class Button {
  label = input<string>('');
  type = input<'submit' | 'button'>('button');
}
