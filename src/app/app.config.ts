import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';

export function initializeApp(primeng: PrimeNG) {
    return async () => {
        const response = await fetch('es.json');
        const translation = await response.json();
        primeng.setTranslation(translation);
    };
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark'
                }
            },
            ripple: true
        }),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [PrimeNG],
            multi: true
        }
    ]
};
