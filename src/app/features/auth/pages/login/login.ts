import { Component, inject, signal, ViewChild, viewChild } from '@angular/core';
import { Field, Button, Link, Toast } from '@shared/components';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'ngx-iam-auth';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  errMsg = signal('Something Went Wrong!');

  displayToast = signal(false);
  loginForm = this.fb.nonNullable.group({
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
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successs',
            detail: 'You logged in successfully!',
          });
        },
        error: (err: any) => {
          this.errMsg.set(err.error.message);
          this.displayToast.set(true);
        },
      });
    } else {
      // show all problematic fields
      this.loginForm.markAllAsTouched();
      // display toast
      this.errMsg.set('Form Fields are not valid.');
      this.displayToast.set(true);
    }
  }
}
