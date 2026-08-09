import { Component, inject, output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button, Toast, InputMessage } from '@shared/components';
import { AuthFlowService } from '../../services/auth-flow-service';
import { InputOtpModule } from 'primeng/inputotp';
import { RegisterFlowService } from '../../services/register-flow-service';
import { AuthService } from '../../../../../../dist/ngx-iam-auth';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register-otp',
  imports: [Button, Toast, ReactiveFormsModule, InputOtpModule, InputMessage, FormsModule],
  templateUrl: './register-otp.html',
})
export class RegisterOtp {
  private readonly authFlowService = inject(AuthFlowService);
  private readonly registerFlowService = inject(RegisterFlowService); // form
  private readonly authService = inject(AuthService); // api
  private readonly messageService = inject(MessageService); // toast

  registerForm = this.registerFlowService.registerForm;

  email = this.authFlowService.email;
  // email = sessionStorage.getItem('register-flow-draft');

  next = output<void>();
  previous = output<void>();

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  otpForm = this.registerFlowService.otpForm;

  submitHandler() {
    if (this.otpForm.valid) {
      // send OTP to the backend (cofirm email)
      this.authService
        .confirmEmail({ email: this.email(), code: this.otpForm.get('otp')?.value })
        .subscribe({
          next: (res) => {
            // store code
            this.messageService.add({
              severity: 'success',
              detail: res.message,
            });
            // move to the next step
            this.next.emit();
          },
          error: (err) => {
            this.errMsg.set(err.error.message);
            this.displayToast.set(true);
          },
        });
    } else {
      // show all problematic fields
      this.otpForm.markAllAsTouched();
      // display toast
      this.errMsg.set('Form Field is not valid.');
      this.displayToast.set(true);
    }
  }

  editHandler() {
    this.previous.emit();
  }
}
