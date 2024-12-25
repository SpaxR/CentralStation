import { MainLayoutComponent } from './main-layout.component';
import { render, screen, within } from '@testing-library/angular';
import { By } from '@angular/platform-browser';

describe('MainLayoutComponent', () => {
  it('should display content', async () => {
    await render('<cs-main-layout><div>CONTENT</div></cs-main-layout>', {
      imports: [MainLayoutComponent],
    });

    const content = await screen.findByText('CONTENT');

    expect(content).toBeTruthy();
  });

  it('should display brand in menubar', async () => {
    const component = await render(MainLayoutComponent);
    const menuStart = component.debugElement.query(By.css('.p-menubar-start'));

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
    await render(MainLayoutComponent);

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
