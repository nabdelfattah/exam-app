import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, Toast, InputMessage } from '@shared/components';
import { AuthFlowService } from '../../services/auth-flow-service';
import { InputOtpModule } from 'primeng/inputotp';
@Component({
  selector: 'app-register-otp',
  imports: [Button, Toast, ReactiveFormsModule, InputOtpModule, InputMessage, FormsModule],
  templateUrl: './register-otp.html',
})
export class RegisterOtp {
  private readonly fb = inject(FormBuilder);
  private readonly authFlowService = inject(AuthFlowService);

  email = this.authFlowService.email;

  next = output<void>();
  previous = output<void>();

  displayToast = signal(false);
  otpForm = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  submitHandler() {
    if (this.otpForm.valid) {
      // move to the next step
      this.next.emit();
    } else {
      // show all problematic fields
      this.otpForm.markAllAsTouched();
      // display toast
      this.displayToast.set(true);
    }
  }

  editHandler() {
    this.previous.emit();
  }
}
