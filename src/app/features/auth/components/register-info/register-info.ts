import { Component, inject, output, signal } from '@angular/core';
import { Button, Toast, Field, InputMessage } from '@/app/shared/components';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import IntlTelInputWithUtils from '@intl-tel-input/angular/with-utils';
import { RegisterFlowService } from '../../services/register-flow-service';
@Component({
  selector: 'app-register-info',
  imports: [Button, Toast, Field, ReactiveFormsModule, IntlTelInputWithUtils, InputMessage],
  templateUrl: './register-info.html',
})
export class RegisterInfo {
  private readonly registerFlowService = inject(RegisterFlowService); // form

  next = output<void>();

  errMsg = signal('Something Went Wrong!');
  displayToast = signal(false);

  infoForm = this.registerFlowService.infoForm;

  submitHandler() {
    if (this.infoForm.valid) {
      // move to the next step
      this.next.emit();
    } else {
      // show all problematic fields
      this.infoForm.markAllAsTouched();
      // display toast
      this.errMsg.set('Form Fields are not valid.');
      this.displayToast.set(true);
    }
  }
  onPhoneChange(_value: string): void {}
}
