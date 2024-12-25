import { MainLayoutComponent } from './main-layout.component';
import { render, screen, within } from '@testing-library/angular';

describe('MainLayoutComponent', () => {
  it('should display content', async () => {
    await render('<cs-main-layout><div>CONTENT</div></cs-main-layout>', {
      imports: [MainLayoutComponent],
    });

    const content = await screen.findByText('CONTENT');

    expect(content).toBeTruthy();
  });

  it('should display brand', async () => {
    await render(MainLayoutComponent);

    const brand = await screen.findByText('CentralStation');

    expect(brand).toBeTruthy();
  });

  it.each(['Dashboard', 'Networks', 'Recipes', 'Pantry'])(
    'should display %p in navigation',
    async (title) => {
      await render(MainLayoutComponent);

      const menubar = await screen.findByRole('menubar');
      const menuItem = await within(menubar).findByLabelText(title);

      expect(menuItem).toBeVisible();
    },
  );
});
