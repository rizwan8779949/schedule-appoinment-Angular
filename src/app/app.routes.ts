import { Routes } from '@angular/router';
import { LoginFailedGuardGuard } from './shared/guards/Login-Failed-Guards/login-failed-guard-guard';
import { LoginSucesssGuardGuard } from './shared/guards/Login-Success-Guards/login-sucesss-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login').then((c) => c.Login) ,
    canActivate: [LoginFailedGuardGuard],
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./home/all-appointment-list/all-appointment-list').then((c) => c.AllAppoinmentList),
    canActivate: [LoginSucesssGuardGuard],
  },
  { path: 'book-appointment', loadComponent: () => import('./auth/book-appointment/book-appointment').then((c) => c.BookAppointment) },
];
