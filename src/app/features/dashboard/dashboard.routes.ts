import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'diplomas',
    loadComponent: () =>
      import('./presentation/diplomas/diplomas.component').then((c) => c.DiplomasComponent),
    title: 'Diplomas',
  },
  {
    path: 'exams',
    loadComponent: () =>
      import('./presentation/exams/exams.component').then((c) => c.ExamsComponent),
    title: 'Exams',
  },
  {
    path: 'questions',
    loadComponent: () =>
      import('./presentation/questions/questions.component').then((c) => c.QuestionsComponent),
    title: 'Questions',
  },
];
