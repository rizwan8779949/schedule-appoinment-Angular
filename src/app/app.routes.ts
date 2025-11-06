import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login').then((c) => c.Login) },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./home/all-appointment-list/all-appointment-list').then((c) => c.AllAppoinmentList),
  },
];
