import { Routes } from '@angular/router';
import { AuthLayout, Notfound } from '@core/components';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { DiplomasComponent } from './features/diplomas/diplomas.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'diplomas', pathMatch: 'full' },
      { path: 'diplomas', component: DiplomasComponent, title: 'Diplomas' },
      {
        path: 'exams',
        loadComponent: () =>
          import('./features/exams/exams.component').then((c) => c.ExamsComponent),
        title: 'Exams',
      },
      {
        path: 'questions',
        loadComponent: () =>
          import('./features/questions/questions.component').then((c) => c.QuestionsComponent),
        title: 'Questions',
      },
      {
        path: 'account',
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
