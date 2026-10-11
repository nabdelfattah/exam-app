import { Component, model, output, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Stepper, StepList, Step, StepPanels, StepPanel } from 'primeng/stepper';
import { EmailFormComponent } from '../email-form/email-form.component';
import { OtpFormComponent } from '../otp-form/otp-form.component';

@Component({
  selector: 'app-email-dialog',
  imports: [
    Dialog,
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    EmailFormComponent,
    OtpFormComponent,
  ],
  templateUrl: './email-dialog.component.html',
})
export class EmailDialogComponent {
  visible = model<boolean>(true);
  currentStep = signal(1);
  refetch = output();
}
