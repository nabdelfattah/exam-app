import { Component, computed, inject, input, signal } from '@angular/core';
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
  errorKeys = computed(() => {
    //signal instead of getter function to utilize signal caching istead of creating a new array each change detection
    const errors = this.control?.errors;
    return errors ? Object.keys(errors) : [];
  });

  // in case of password input
  showPassword = signal(false);
  inputType = computed(() => {
    if (this.type() != 'password') return this.type();
    return this.showPassword() ? 'text' : 'password';
  });
  eyeIcon = computed(() => (this.showPassword() ? 'eye' : 'eye-off'));
  toggleEye() {
    this.showPassword.update((prev) => !prev);
  }

  private readonly controlContainer = inject(ControlContainer);

  get control() {
    return this.controlContainer.control?.get(this.controlName());
  }

  get showError(): boolean {
    return !!this.control?.invalid && !!this.control?.touched;
  }
}
