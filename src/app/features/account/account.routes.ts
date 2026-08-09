import { Routes } from '@angular/router';

export const accountRoutes: Routes = [
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then((c) => c.SettingsComponent),
    title: 'Settings',
  },
];
