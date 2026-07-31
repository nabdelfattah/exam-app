import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
// import { provideAnimations } from '@angular/platform-browser/animations';
// primeNg
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { errorInterceptor } from '@core/interceptors/error-interceptor';
import { MyPreset } from './core/theme/my-preset';
import { headerInterceptor } from './core/interceptors/header-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false, // or '.dark-mode', depending on your setup
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
        },
      },
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([errorInterceptor, headerInterceptor])),
    MessageService,
    // provideAnimations(),
  ],
};
