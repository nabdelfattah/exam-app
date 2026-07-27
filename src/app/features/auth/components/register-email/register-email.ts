import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, Field, Toast, Link } from '@shared/components';
import { AuthFlowService } from '../../services/auth-flow-service';

@Component({
  selector: 'app-register-email',
  imports: [Field, Button, Link, Toast, ReactiveFormsModule],
  templateUrl: './register-email.html',
})
export class RegisterEmail {
  private readonly fb = inject(FormBuilder);
  private readonly authFlowService = inject(AuthFlowService);

  next = output<void>();

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submitHandler() {
    if (this.registerForm.valid) {
      // store the email in the authServide and send it to the register-otp page
      this.authFlowService.setEmail(this.registerForm.get('email')?.getRawValue());
      // move to the next step
      this.next.emit();
    } else {
      // show all problematic fields
      this.registerForm.markAllAsTouched();
      // display toast
      this.displayToast.set(true);
    }
  }
}
