import { AppComponent } from './app.component';
import { render, screen, within } from '@testing-library/angular';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { By } from '@angular/platform-browser';

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

  describe('NavBar', () => {
    it('should display brand in menubar', async () => {
      const component = await render(AppComponent);
      const menuStart = component.debugElement.query(
        By.css('.p-menubar-start'),
      );

      const brand = await within(menuStart.nativeElement).findByText(
        'CentralStation',
      );

      expect(brand).toBeTruthy();
    });

    it.each([
      { title: 'Dashboard', link: '/' },
      { title: 'Networking', link: '/networking' },
      { title: 'Kitchen', link: '/cooking' },
      { title: 'Pantry', link: '/pantry' },
    ])('should have $title in navigation', async (item) => {
      await render(AppComponent);

      const menubar = await screen.findByRole('menubar');
      const menuItem = await within(menubar).findByLabelText(item.title);
      expect(menuItem).toBeVisible();

      const link = menuItem.querySelector('a');
      expect(link).toBeVisible();
      expect(link!.href).toBeTruthy();

      const url = new URL(link!.href);
      expect(url.pathname).toBe(item.link);
    });
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
