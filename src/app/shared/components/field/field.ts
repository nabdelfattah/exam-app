import { Component, inject, input } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMessage } from '../input-message/input-message';

@Component({
  selector: 'app-field',
  imports: [ReactiveFormsModule, InputTextModule, InputMessage],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  templateUrl: './field.html',
})
export class Field {
  type = input<string>('text');
  label = input<string>('');
  placeholder = input<string>('');
  controlName = input<string>('');
  errorMessages = input<Record<string, string>>({});
  private readonly controlContainer = inject(ControlContainer);

  get control() {
    return this.controlContainer.control?.get(this.controlName());
  }

  get showError(): boolean {
    return !!this.control?.invalid && !!this.control?.touched;
  }

  get errorKeys(): string[] {
    return this.control?.errors ? Object.keys(this.control.errors) : [];
  }
}
