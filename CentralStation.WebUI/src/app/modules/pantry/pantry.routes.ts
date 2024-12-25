import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pantry.component').then(
        (component) => component.PantryComponent,
      ),
  },
];
