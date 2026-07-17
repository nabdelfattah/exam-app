import { Component, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Field, Button, Link, Toast } from '@shared/components';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule, RouterLink],
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
