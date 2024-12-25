import { Type } from '@angular/core';
import { NetworkOverviewComponent } from './modules/networking/network-overview/network-overview.component';
import { NetworkDeviceOverviewComponent } from './modules/networking/network-device-overview/network-device-overview.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { KitchenComponent } from './modules/kitchen/kitchen.component';
import { PantryComponent } from './modules/pantry/pantry.component';

describe('Routing', () => {
  let harness: RouterTestingHarness;
  beforeEach(async () => (harness = await RouterTestingHarness.create()));

  it.each(<{ link: string; component: Type<any> }[]>[
    { link: '/networking', component: NetworkOverviewComponent },
    {
      link: '/networking/network/x',
      component: NetworkDeviceOverviewComponent,
    },
    { link: '/dashboard', component: DashboardComponent },
    { link: '/kitchen', component: KitchenComponent },
    { link: '/pantry', component: PantryComponent },
  ])('should navigate to $component root-page', async (route) => {
    await harness.navigateByUrl(route.link, route.component);
  });

  it('should redirect root to dashboard', async () => {
    await harness.navigateByUrl('', DashboardComponent);
  });

  it('should redirect missing route to dashboard', async () => {
    await harness.navigateByUrl('non-existing-route', DashboardComponent);
  });
});
