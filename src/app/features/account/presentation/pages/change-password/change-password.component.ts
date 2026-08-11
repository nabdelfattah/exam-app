import { Component, inject, signal } from '@angular/core';
import { AccountService } from '../../../infrastructure/account.service';
import { MessageService } from 'primeng/api';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordPattern } from '@/app/features/auth/utils/patterns';
import { Toast, Button, Field } from '@/app/shared/components';

@Component({
  selector: 'app-change-password',
  imports: [Toast, Button, Field, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  private readonly AccountService = inject(AccountService); // api
  private readonly messageService = inject(MessageService); // toast
  private readonly fb = inject(FormBuilder);

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  passwordForm = this.fb.nonNullable.group(
    {
      currentPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      newPassword: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: [this.confirmPassword] },
  );

  submitHandler() {
    if (this.passwordForm.valid) {
      // send request to backend
      this.AccountService.changePassword(this.passwordForm.getRawValue()).subscribe({
        next: (res) => {
          // show success toast
          this.messageService.add({
            severity: 'success',
            detail: 'You changed your password successfully!',
          });
          // reset the form
          this.passwordForm.reset();
        },
        error: (err) => {
          // display toast
          this.errMsg.set(err.error.message);
          this.displayToast.set(true);
          // reset the form
          this.passwordForm.reset();
        },
      });
    } else {
      // show all problematic fields
      this.passwordForm.markAllAsTouched();
      // display toast
      this.errMsg.set('Form Fields are not valid.');
      this.displayToast.set(true);
    }
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('newPassword')?.value;
    const rePassword = group.get('confirmPassword')?.value;

    if (rePassword !== password && rePassword !== '') {
      // put error to the form control (rePassword)
      group.get('confirmPassword')?.setErrors({ mismatch: true });

      // put error to the form itself
      return { mismatch: true };
    } else {
      return null;
    }
  }
}
