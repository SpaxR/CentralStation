import { render, screen, within } from '@testing-library/angular';
import { NetworkEditFormComponent } from './network-edit-form.component';
import { userEvent } from '@testing-library/user-event';

describe('NetworkEditFormComponent', () => {
  beforeEach(() => render(NetworkEditFormComponent));

  it('should update network when display-name changes', () => {
    const value = 'Test-DisplayName';

    const input = screen.getByLabelText('Name');
    userEvent.type(input, value);

    // expect(component.network.displayName).toBe(value);
    // todo
  });

  it('should update network when address changes', () => {
    const address = [1, 2, 3, 4];

    for (let i = 0; i < 4; i++) {
      const input = within(screen.getByLabelText('Address')).getByLabelText(
        'address-part-' + i,
      );
      userEvent.type(input, address[i].toString());
    }

    // expect(component.network.address).toEqual(address);
    // todo
  });

  it('should update network when subnet changes', () => {
    const address = [1, 2, 3, 4];

    for (let i = 0; i < 4; i++) {
      const input = within(screen.getByLabelText('SubNet')).getByLabelText(
        'address-part-' + i,
      );
      userEvent.type(input, address[i].toString());
    }

    // expect(component.network.subnet).toEqual(subnet);
    // todo
  });
});
