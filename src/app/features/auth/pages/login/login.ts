import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Field, Button } from '@shared/components';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
@Component({
  selector: 'app-login',
  imports: [ButtonModule, Field, Button, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username: ['', Validators.required, Validators.minLength(3)],
    password: [
      '',
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    ],
  });
}
