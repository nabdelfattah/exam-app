import IntlTelInputWithUtils from '@intl-tel-input/angular/with-utils';
import { Field, InputMessage, Button } from '@/app/shared/components';
import { Component, inject, model, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../infrastructure/account.service';
import { User } from '../../../domain/user.interface';
import { EmailDialogComponent } from '../../components/email-dialog/email-dialog.component';

@Component({
  selector: 'app-profile',
  imports: [
    Button,
    Field,
    ReactiveFormsModule,
    IntlTelInputWithUtils,
    InputMessage,
    EmailDialogComponent,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  private readonly accountService = inject(AccountService);

  email = signal<string>('');
  emailDialogVisible = model<boolean>(false);

  profileForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: [{ value: '', disabled: true }],
    phone: ['', [Validators.required]],
  });

  ngOnInit() {
    this.getUserDataAndFillTheForm();
  }

  getUserDataAndFillTheForm() {
    this.accountService.getUser().subscribe({
      next: (res: User) => {
        this.email.set(res.email);
        this.profileForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          username: res.username,
          phone: res.phone,
        });
      },
      error: () => {
        // handled globally by interceptor
      },
    });
  }

  submitHandler() {
    if (this.profileForm.valid) {
      // send data to backend
      console.log(this.profileForm.value);

      // convert the phone number to the correct format if it was an Egyption number. else leave it as is
      const phone = this.profileForm.getRawValue().phone.startsWith('+20')
        ? '0' + this.profileForm.getRawValue().phone.slice(3)
        : this.profileForm.getRawValue().phone;

      // add the modified phone number to the payload
      const payload = { ...this.profileForm.value, phone: phone };

      this.accountService.updateUser(payload).subscribe({
        next: (res: User) => {
          console.log({ res });

          //  get Updated data
          this.getUserDataAndFillTheForm();
        },
        error: () => {
          // handled globally by interceptor
        },
      });
    } else {
      // show all problematic fields
      this.profileForm.markAllAsTouched();
    }
  }

  changeEmailHandler() {
    console.log('button clicked');
    this.emailDialogVisible.set(true);
  }

  onPhoneChange(_value: string): void {}
}
