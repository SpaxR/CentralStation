import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./network-overview/network-overview.component')
        .then(component => component.NetworkOverviewComponent)
  },
  {
    path: 'network/:network-id',
    loadComponent: () =>
      import('./network-device-overview/network-device-overview.component')
        .then(component => component.NetworkDeviceOverviewComponent)
  }
];
