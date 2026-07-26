import { Routes } from '@angular/router';
import { CheckEmail } from './pages/check-email/check-email';
import { ForgetPassword } from './pages/forget-password/forget-password';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ResetPassword } from './pages/reset-password/reset-password';

export const authRoutes: Routes = [
  { path: 'login', loadComponent: Login, title: 'Login' },
  { path: 'register', loadComponent: Register, title: 'Register' },
  { path: 'forget-password', loadComponent: ForgetPassword, title: 'Forget Password' },
  { path: 'check-email', loadComponent: CheckEmail, title: 'Check Email' },
  { path: 'reset-password', loadComponent: ResetPassword, title: 'Reset Password' },
];
