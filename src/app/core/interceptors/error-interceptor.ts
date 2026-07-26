import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((err) => {
      // display error message in toaster
      messageService.add({ severity: 'warn', summary: 'Error', detail: err.error.message });
      return throwError(() => err);
    }),
  );
};
