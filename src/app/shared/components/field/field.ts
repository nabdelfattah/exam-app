import { Component, input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-field',
  imports: [],
  templateUrl: './field.html',
})
export class Field {
  type = input<string>('text');
  label = input<string>('');
  placeholder = input<string>('');
  controlName = input<string>('');
}
