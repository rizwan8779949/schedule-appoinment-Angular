import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // provideStore({
    //   userMgmt: userMgmtReducer,
    //   login: loginReducer,
    // }),
    // provideEffects([UserMgmtEffects,AuthEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    importProvidersFrom(MatNativeDateModule),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ]
};
