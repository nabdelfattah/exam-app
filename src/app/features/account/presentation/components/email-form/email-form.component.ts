import { Component, inject, output } from '@angular/core';
import { Field, Button } from '@/app/shared/components';
import { AuthFlowService } from '@/app/features/auth/services/auth-flow-service';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../../infrastructure/account.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  imports: [Field, Button, ReactiveFormsModule],
  templateUrl: './email-form.component.html',
})
export class EmailFormComponent {
  private readonly authFlowService = inject(AuthFlowService); // store emeil for ui purpose
  private readonly accountService = inject(AccountService); // api
  private readonly messageService = inject(MessageService); // toast
  private fb = inject(FormBuilder);

  next = output<void>();

  emailForm = this.fb.nonNullable.group({
    newEmail: ['', [Validators.required, Validators.email]],
  });

  submitHandler() {
    if (this.emailForm.valid) {
      // verify emeil
      this.accountService.verifyEmail(this.emailForm.value).subscribe({
        next: (res) => {
          // display toast
          this.messageService.add({
            severity: 'success',
            detail: res.message,
          });
          // move to the next step
          this.next.emit();
        },
        error: (err) => {
          // already handled globally via error interceptor
        },
      });
      // store the email in the authServide and send it to the register-otp page
      this.authFlowService.setEmail(this.emailForm.get('newEmail')?.getRawValue());
    } else {
      // show all problematic fields
      this.emailForm.markAllAsTouched();
    }
  }
}
