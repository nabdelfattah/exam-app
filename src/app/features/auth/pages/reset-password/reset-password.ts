import { AuthService } from 'ngx-iam-auth';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button, Field, Link, Toast } from '@/app/shared/components';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  resetForm = this.fb.nonNullable.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      rePassword: ['', [Validators.required]],
    },
    { validators: [this.confirmPassword] },
  );

  submitHandler() {
    if (this.resetForm.valid) {
      // send request to backend
      this.authService
        .resetPassword({
          token: 'string',
          newPassword: this.resetForm.get('password')?.value || '',
          confirmPassword: this.resetForm.get('rePassword')?.value || '',
        })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: 'Successs',
              detail: res.message,
            });
            // redirect to the login page
            this.router.navigate(['/login']);
          },
          error: (err: any) => {
            this.errMsg.set(err.error.message);
            this.displayToast.set(true);
          },
        });
    } else {
      // show all problematic fields
      this.resetForm.markAllAsTouched();
      // display toast
      this.errMsg.set('Form Fields are not valid.');
      this.displayToast.set(true);
    }
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (rePassword !== password && rePassword !== '') {
      // put error to the form control (rePassword)
      group.get('rePassword')?.setErrors({ mismatch: true });

      // put error to the form itself
      return { mismatch: true };
    } else {
      return null;
    }
  }
}
