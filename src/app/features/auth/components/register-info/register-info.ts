import { Component, inject, output, signal } from '@angular/core';
import { Button, Toast, Field } from '@/app/shared/components';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-info',
  imports: [Button, Toast, Field, ReactiveFormsModule],
  templateUrl: './register-info.html',
})
export class RegisterInfo {
  private readonly fb = inject(FormBuilder);

  next = output<void>();

  displayToast = signal(false);
  infoForm = this.fb.group({
    fName: ['', [Validators.required]],
    lName: ['', [Validators.required]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
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
}
