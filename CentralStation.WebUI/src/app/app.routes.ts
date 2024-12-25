import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.routes').then((r) => r.routes),
  },
  {
    path: 'networking',
    loadChildren: () =>
      import('./modules/networking/networking.routes').then((r) => r.routes),
  },
  {
    path: 'kitchen',
    loadChildren: () =>
      import('./modules/kitchen/kitchen.routes').then((r) => r.routes),
  },
  {
    path: 'pantry',
    loadChildren: () =>
      import('./modules/pantry/pantry.routes').then((r) => r.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
