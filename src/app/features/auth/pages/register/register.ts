import { Component } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-register',
  imports: [StepperModule, Button],
  templateUrl: './register.html',
})
export class Register {}
