import {Type} from "@angular/core";
import {NetworkOverviewComponent} from "./modules/networking/network-overview/network-overview.component";
import {
  NetworkDeviceOverviewComponent
} from "./modules/networking/network-device-overview/network-device-overview.component";
import {RouterTestingHarness} from "@angular/router/testing";

describe('Routing', () => {
  it.each(<{ link: string; component: Type<any> }[]>[
    { link: '/networking', component: NetworkOverviewComponent },
    { link: '/networking/4', component: NetworkDeviceOverviewComponent },
    // { link: '/dashboard', component: DashboardComponent },
    // {link:'/kitchen', component: KitchenOverviewComponent},
    // {link:'/pantry', component: PantryOverviewComponent},
  ])('should navigate to $component root-page', async (route) => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(route.link, route.component);
  });
});
