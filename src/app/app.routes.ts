import { Routes } from '@angular/router';
import { ForgetPassword, Login, Register, ResetPassword } from '@app/features/auth';
import { AuthLayout, Notfound } from '@core/components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login, title: 'Login' },
      { path: 'register', component: Register, title: 'Register' },
      { path: 'otp', component: Login, title: 'Verify OTP' },
      { path: 'forget-password', component: ForgetPassword, title: 'Forget Password' },
      { path: 'reset-password', component: ResetPassword, title: 'Reset Password' },
    ],
  },
  { path: '**', component: Notfound },
];
