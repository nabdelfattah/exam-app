import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, Field, Toast, Link } from '@shared/components';

@Component({
  selector: 'app-register-email',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './register-email.html',
})
export class RegisterEmail {
  private readonly fb = inject(FormBuilder);

  next = output<void>();

  displayToast = signal(false);
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submitHandler() {
    if (this.registerForm.valid) {
      // move to the next step
      this.next.emit();
    } else {
      // show all problematic fields
      this.registerForm.markAllAsTouched();
      // display toast
      this.displayToast.set(true);
    }
  }
}
