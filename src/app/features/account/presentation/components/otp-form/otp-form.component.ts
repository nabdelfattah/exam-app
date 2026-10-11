import { AuthFlowService } from '@/app/features/auth/services/auth-flow-service';
import { Button, InputMessage } from '@/app/shared/components';
import { Component, inject, model, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputOtpModule } from 'primeng/inputotp';
import { AccountService } from '../../../infrastructure/account.service';

@Component({
  selector: 'app-otp-form',
  imports: [Button, ReactiveFormsModule, InputOtpModule, InputMessage, FormsModule],
  templateUrl: './otp-form.component.html',
})
export class OtpFormComponent {
  private readonly authFlowService = inject(AuthFlowService);
  private readonly messageService = inject(MessageService); // toast
  private readonly accountService = inject(AccountService);
  private readonly fb = inject(FormBuilder);

  email = this.authFlowService.email;
  previous = output<void>();
  visible = model<boolean>();

  refetch = output();

  otpForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  submitHandler() {
    if (this.otpForm.valid) {
      // send OTP to the backend (cofirm email)
      this.accountService.confirmEmail(this.otpForm.getRawValue()).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            detail: 'Email changed successfully.',
          });
          // Have the parent fetch the new updated data.
          this.refetch.emit();
          // close the dialog
          this.visible.set(false);
        },
        error: (err) => {
          //  already handled globally via error interceptor
        },
      });
    } else {
      // show all problematic fields
      this.otpForm.markAllAsTouched();
    }
  }

  editHandler() {
    this.previous.emit();
  }
}
