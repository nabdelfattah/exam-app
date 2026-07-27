import { Link, Field, Button, Toast } from '@/app/shared/components';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFlowService } from '../../services/auth-flow-service';

@Component({
  selector: 'app-forget-password',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './forget-password.html',
})
export class ForgetPassword {
  private readonly fb = inject(FormBuilder);
  private readonly authFlowService = inject(AuthFlowService); // to store email for the check-email page
  private readonly router = inject(Router);

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  forgetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submitHandler() {
    if (this.forgetForm.valid) {
      // send request to backend
      // store the email in the authServide and send it to the confirmation page
      this.authFlowService.setEmail(this.forgetForm.get('email')?.getRawValue());
      // redirect to the confirmation page
      this.router.navigate(['/check-email']);
    } else {
      // show all problematic fields
      this.forgetForm.markAllAsTouched();
      // display toast
      this.displayToast.set(true);
    }
  }
}
