import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'networking',
    loadComponent: () =>
      import('./modules/networking/network-overview/network-overview.component')
        .then(component => component.NetworkOverviewComponent)
  }
];
