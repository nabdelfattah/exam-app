import { Component, inject, signal, ViewChild, viewChild } from '@angular/core';
import { Field, Button, Link, Toast } from '@shared/components';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'ngx-iam-auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { passwordPattern } from '../../utils/patterns';
@Component({
  selector: 'app-login',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  errMsg = signal('Something Went Wrong!');

  displayToast = signal(false);
  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
  });

  submitHandler() {
    if (this.loginForm.valid) {
      // send request to backend
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            detail: 'You logged in successfully!',
          });
          // store token and user data
          localStorage.setItem('examToken', res.token);
          localStorage.setItem(
            'examUser',
            JSON.stringify({
              username: res.username,
              email: res.email,
              phone: res.phone,
              firstName: res.firstName,
              lastName: res.lastName,
              profilePhoto: res.profilePhoto,
              role: res.role,
            }),
          );

          // redirect to dashboard
          this.router.navigate(['/diplomas']);
        },
        error: (err) => {
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
