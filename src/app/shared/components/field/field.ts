import { Component, input } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-field',
  imports: [ReactiveFormsModule, InputTextModule],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './field.html',
})
export class Field {
  type = input<string>('text');
  label = input<string>('');
  placeholder = input<string>('');
  controlName = input<string>('');
}
