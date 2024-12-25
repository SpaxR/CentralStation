import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';
import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { NetworkOverviewComponent } from './modules/networking/network-overview/network-overview.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { NetworkDeviceOverviewComponent } from './modules/networking/network-device-overview/network-device-overview.component';

describe('AppComponent', () => {
  it('should display router-outlet', async () => {
    await render(AppComponent, {
      routes: [
        {
          path: '**',
          component: TestComponent,
        },
      ],
    });

    const content = await screen.findByText('CONTENT');

    expect(content).toBeInTheDocument();
  });

  it('should have menu', async () => {
    await render(AppComponent);

    const menu = await screen.findByRole('menubar');

    expect(menu).toBeInTheDocument();
  });

  it('should display toast in bottom right corner', async () => {
    const component = await render(AppComponent);
    TestBed.inject(MessageService).add({ summary: 'TEST-MESSAGE' });
    component.detectChanges();

    const message = await screen.findByRole('alert');

    expect(message).toHaveTextContent('TEST-MESSAGE');
  });
});

@Component({
  selector: 'test-component',
  template: 'CONTENT',
  standalone: true,
})
class TestComponent {}

describe('App-Routing', () => {
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
