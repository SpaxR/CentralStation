import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';

describe('AppComponent', () => {
  beforeEach(async () => await render(AppComponent));

  it(`should have the 'CentralStation' title`, async () => {
    const title = await screen.findByText('CentralStation');
    expect(title).toBeDefined();
  });
});
