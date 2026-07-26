import { Routes } from '@angular/router';
import { AuthLayout, Notfound } from '@core/components';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'dashboard' },
    ],
  },
  {
    path: '',
    component: AuthLayout,
    loadChildren: () => import('./features/auth/auth.route').then((c) => c.authRoutes),
  },
  { path: '**', component: Notfound },
];
