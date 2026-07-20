import { Component, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
// never have a component reach back into the same barrel
import { RegisterInfo } from '../../components/register-info/register-info';
import { RegisterOtp } from '../../components/register-otp/register-otp';
import { RegisterPassword } from '../../components/register-password/register-password';
import { RegisterEmail } from '../../components/register-email/register-email';

@Component({
  selector: 'app-register',
  imports: [StepperModule, RegisterEmail, RegisterInfo, RegisterOtp, RegisterPassword],
  templateUrl: './register.html',
})
export class Register {
  currentStep = signal(1);
}
