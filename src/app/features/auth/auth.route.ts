import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((c) => c.Login),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((c) => c.Register),
    title: 'Register',
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./pages/forget-password/forget-password').then((c) => c.ForgetPassword),
    title: 'Forget Password',
  },
  {
    path: 'check-email',
    loadComponent: () => import('./pages/check-email/check-email').then((c) => c.CheckEmail),
    title: 'Check Email',
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password').then((c) => c.ResetPassword),
    title: 'Reset Password',
  },
];
