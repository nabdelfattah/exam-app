import { Component, inject, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Button, Field, Toast, Link } from '@shared/components';
import { AuthFlowService } from '../../services/auth-flow-service';
import { RegisterFlowService } from '../../services/register-flow-service';
import { AuthService } from 'ngx-iam-auth';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-email',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './register-email.html',
})
export class RegisterEmail {
  private readonly authFlowService = inject(AuthFlowService); // store emeil for ui purpose
  private readonly registerFlowService = inject(RegisterFlowService); // form
  private readonly authService = inject(AuthService); // api
  private readonly messageService = inject(MessageService); // toast

  registerForm = this.registerFlowService.registerForm;

  next = output<void>();

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  submitHandler() {
    if (this.registerForm.valid) {
      // verify emeil
      this.authService.verifyEmail(this.registerForm.value).subscribe({
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
          this.errMsg.set(err.error.message);
          this.displayToast.set(true);
        },
      });
      // store the email in the authServide and send it to the register-otp page
      this.authFlowService.setEmail(this.registerForm.get('email')?.getRawValue());
    } else {
      // show all problematic fields
      this.registerForm.markAllAsTouched();
      // display toast
      this.errMsg.set('Form Field is not valid.');
      this.displayToast.set(true);
    }
  }
}
