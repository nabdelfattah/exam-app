import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('examToken')) {
    return true;
  } else {
    // stop the current routing and navigate the user to /login
    return router.parseUrl('/login');
  }
};
