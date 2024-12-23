import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

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
