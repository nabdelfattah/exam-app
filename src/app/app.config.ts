import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
// import { provideAnimations } from '@angular/platform-browser/animations';
// primeNg
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { errorInterceptor } from '@core/interceptors/error-interceptor';
import { MyPreset } from './core/theme/my-preset';

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
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor])),
    MessageService,
    // provideAnimations(),
  ],
};
