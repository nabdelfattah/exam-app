import { Component, inject, signal, ViewChild, viewChild } from '@angular/core';
import { Field, Button, Link, Toast } from '@shared/components';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);

  displayToast = signal(false);
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  submitHandler() {
    if (this.loginForm.valid) {
      // send request to backend
    } else {
      // show all problematic fields
      this.loginForm.markAllAsTouched();
      // display toast
      this.displayToast.set(true);
    }
  }
}
