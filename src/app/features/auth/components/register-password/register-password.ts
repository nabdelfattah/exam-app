import { Component, inject, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button, Field, Toast } from '@/app/shared/components';
import { RegisterFlowService } from '../../services/register-flow-service';
import { AuthService } from 'ngx-iam-auth';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register-password',
  imports: [Field, Button, Toast, ReactiveFormsModule],
  templateUrl: './register-password.html',
})
export class RegisterPassword {
  private readonly registerFlowService = inject(RegisterFlowService); // form
  private readonly authService = inject(AuthService); // api
  private readonly messageService = inject(MessageService); // toast
  private readonly router = inject(Router);

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  passwordForm = this.registerFlowService.passwordForm;

  submitHandler() {
    if (this.passwordForm.valid) {
      // send request to backend// send OTP to the backend (cofirm email)
      this.authService.register(this.registerFlowService.buildPayload()).subscribe({
        next: (res) => {
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
          // show success toast
          this.messageService.add({
            severity: 'success',
            detail: 'You created an accout successfully!',
          });
          // redirect to the login page
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          // display toast
          this.errMsg.set(err.error.message);
          this.displayToast.set(true);
          // reset the form
          // this.registerFlowService.resetAfterSuccess();
        },
      });
    } else {
      // show all problematic fields
      this.passwordForm.markAllAsTouched();
      // display toast
      this.errMsg.set('Form Field is not valid.');
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
