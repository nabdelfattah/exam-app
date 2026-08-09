import { Link, Field, Button, Toast } from '@/app/shared/components';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFlowService } from '../../services/auth-flow-service';
import { AuthService } from '../../../../../../dist/ngx-iam-auth';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './forget-password.html',
})
export class ForgetPassword {
  private readonly fb = inject(FormBuilder);
  private readonly authFlowService = inject(AuthFlowService); // to store email for the check-email page
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService); // api
  private readonly messageService = inject(MessageService); // toast

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  forgetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submitHandler() {
    if (this.forgetForm.valid) {
      // send request to backend
      this.authService
        .forgetPassword({
          redirectUrl: 'http://localhost:4200/reset-password',
          email: this.forgetForm.get('email')?.value || '',
        })
        .subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              detail: res.message,
            });
            // store the email in the authServide and send it to the confirmation page
            this.authFlowService.setEmail(this.forgetForm.get('email')?.getRawValue());
            // redirect to the confirmation page
            this.router.navigate(['/check-email']);
          },
          error: (err) => {
            this.errMsg.set(err.error?.message ?? 'Something went wrong');
            this.displayToast.set(true);
          },
        });
    } else {
      // show all problematic fields
      this.forgetForm.markAllAsTouched();
      // display toast
      this.displayToast.set(true);
    }
  }
}
