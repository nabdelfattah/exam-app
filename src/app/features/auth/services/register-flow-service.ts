import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

const STORAGE_KEY = 'register-flow-draft';

@Injectable({ providedIn: 'root' })
export class RegisterFlowService {
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    registerForm: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    }),
    otpForm: this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    }),
    infoForm: this.fb.group({
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required]],
    }),
    passwordForm: this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
          ],
        ],
        rePassword: ['', [Validators.required]],
      },
      { validators: [this.confirmPassword] },
    ),
  });

  constructor() {
    // Restore any previously saved form data.
    this.restoreFromStorage();

    // Automatically save the form whenever it changes.
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      // never persist raw passwords to storage
      // Extract passwordForm property into its own variable, and put all the remaining into new object called rest.
      const { passwordForm, ...rest } = value;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    });
  }

  get registerForm() {
    return this.form.get('registerForm') as FormGroup;
  }
  get otpForm() {
    return this.form.get('otpForm') as FormGroup;
  }
  get infoForm() {
    return this.form.get('infoForm') as FormGroup;
  }
  get passwordForm() {
    return this.form.get('passwordForm') as FormGroup;
  }

  private confirmPassword(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }

  private restoreFromStorage(): void {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.form.patchValue(JSON.parse(saved));
    }
  }

  /** Maps the nested form shape to the exact backend payload shape */
  buildPayload() {
    const { email } = this.registerForm.value;
    const { fName, lName, username, phone } = this.infoForm.value;
    const { password, rePassword } = this.passwordForm.value;

    return {
      username,
      email,
      password,
      confirmPassword: rePassword,
      firstName: fName,
      lastName: lName,
      phone,
    };
  }

  resetAfterSuccess(): void {
    this.form.reset();
    sessionStorage.removeItem(STORAGE_KEY);
  }
}
