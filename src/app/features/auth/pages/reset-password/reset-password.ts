import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button, Field, Link, Toast } from '@/app/shared/components';

@Component({
  selector: 'app-reset-password',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  displayToast = signal(false);
  resetForm = this.fb.group(
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
      // redirect to the login page
      this.router.navigate(['/login']);
    } else {
      // show all problematic fields
      this.resetForm.markAllAsTouched();
      // display toast
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
