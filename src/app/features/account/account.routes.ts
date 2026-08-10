import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./presentation/pages/profile/profile.component').then((c) => c.ProfileComponent),
    title: 'Profile',
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./presentation/pages/change-password/change-password.component').then(
        (c) => c.ChangePasswordComponent,
      ),
    title: 'Change Password',
  },
];
