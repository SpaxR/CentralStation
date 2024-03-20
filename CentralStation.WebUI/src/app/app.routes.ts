import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'networking',
    loadComponent: () => import('./modules/networking/networking.component').then(component => component.NetworkingComponent)
  }
];
