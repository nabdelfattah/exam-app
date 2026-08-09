import { Routes } from '@angular/router';

export const diplomasdRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/diplomas/diplomas.component').then((c) => c.DiplomasComponent),
    title: 'Diplomas',
  },
  {
    path: 'exams/:id',
    loadComponent: () =>
      import('./presentation/exams/exams.component').then((c) => c.ExamsComponent),
    title: 'Exams',
  },
  {
    path: 'questions/:id',
    loadComponent: () =>
      import('./presentation/questions/questions.component').then((c) => c.QuestionsComponent),
    title: 'Questions',
  },
];
