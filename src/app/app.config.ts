import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { userMgmtReducer } from './shared/ngrx/allUserMgmt/user-mgmt.reducer';
import { loginReducer } from './shared/ngrx/login/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserMgmtEffects } from './shared/ngrx/allUserMgmt/user-mgmt.effects';
import { AuthEffects } from './shared/ngrx/login/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideStore({
      userMgmt: userMgmtReducer,
      login: loginReducer,
    }),
    provideEffects([UserMgmtEffects,AuthEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ]
};
