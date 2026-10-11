import { Routes } from '@angular/router';
import { AuthLayout, Notfound } from '@core/components';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { SettingsLayoutComponent } from './features/account/presentation/components/settings-layout/settings-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
      {
        path: 'diplomas',
        loadChildren: () =>
          import('./features/dashboard/diplomas.routes').then((c) => c.diplomasdRoutes),
        title: 'Diplomas',
      },
      {
        path: 'account',
        component: SettingsLayoutComponent,
        loadChildren: () =>
          import('./features/account/account.routes').then((c) => c.accountRoutes),
      },
    ],
  },
  {
    path: '',
    component: AuthLayout,
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.route').then((c) => c.authRoutes),
  },
  { path: '**', component: Notfound },
];
