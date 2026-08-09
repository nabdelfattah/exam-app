import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

const AUTH_PATHS = ['/login', '/register', '/forget-password', '/check-email', '/reset-password'];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const router = inject(Router);
  const isAuthPage = AUTH_PATHS.some((path) => router.url.startsWith(path));

  return next(req).pipe(
    catchError((err) => {
      // display error message in toaster Only in non auth pages
      if (!isAuthPage) {
        messageService.add({ severity: 'error', detail: err.error.message });
      }
      return throwError(() => err);
    }),
  );
};
