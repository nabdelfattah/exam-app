import { Component, inject, output, signal } from '@angular/core';
import { Button, Toast, Field, InputMessage } from '@/app/shared/components';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import IntlTelInputWithUtils from '@intl-tel-input/angular/with-utils';
@Component({
  selector: 'app-register-info',
  imports: [Button, Toast, Field, ReactiveFormsModule, IntlTelInputWithUtils, InputMessage],
  templateUrl: './register-info.html',
})
export class RegisterInfo {
  private readonly fb = inject(FormBuilder);

  next = output<void>();

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  infoForm = this.fb.group({
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required]],
  });

  submitHandler() {
    if (this.infoForm.valid) {
      // move to the next step
      this.next.emit();
    } else {
      // show all problematic fields
      this.infoForm.markAllAsTouched();
      // display toast
      this.displayToast.set(true);
    }
  }
  onPhoneChange(_value: string): void {}
}
