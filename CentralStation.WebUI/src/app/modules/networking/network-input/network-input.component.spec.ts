import { NetworkInputComponent } from './network-input.component';
import { render, RenderResult, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { Utils } from '../utils';

describe('NetworkInputComponent', () => {
  let component: RenderResult<NetworkInputComponent>;
  let addressChange: jest.Mock;

  beforeEach(async () => {
    component = await render(NetworkInputComponent, {
      on: { addressChange: (addressChange = jest.fn()) },
    });
  });

  it('should render dots in between inputs', async () => {
    const element = (await screen.findByLabelText('address')).children[0]!;
    expect(element.children.length).toBe(7);

    const [, dot1, , dot2, , dot3] = Array.from(element.children);

    expect(dot1.textContent).toBe('.');
    expect(dot2.textContent).toBe('.');
    expect(dot3.textContent).toBe('.');
  });

  describe.each([
    'address-part-0',
    'address-part-1',
    'address-part-2',
    'address-part-3',
  ])('Field %p', (inputLabel) => {
    let input: HTMLInputElement;

    beforeEach(() => {
      input = screen.getByLabelText(inputLabel);
      expect(input).toBeDefined();
    });

    // Calls onFocus function when an input field is focused
    it('should select all text when field is focused', async () => {
      await component.rerender({
        inputs: {
          address: Utils.IpAddressToNumber([255, 255, 255, 255]),
        },
      });

      await userEvent.click(input);

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(3);
    });

    it('should allow valid input', async () => {
      await userEvent.type(input, '42');

      expect(input.value).toBe('42');
    });

    it('should insert 0 and select on first click', async () => {
      await userEvent.click(input);

      expect(input.value).toBe('0');
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(1);
    });

    it('should ignore input of minus-sign', async () => {
      await userEvent.clear(input);
      await userEvent.type(input, '-7');
      expect(input.value).toBe('7');
    });

    it('should clamp values over 255', async () => {
      await userEvent.type(input, '256');

      expect(input.value).toBe('255');
    });
  });

  it('should update address on input', async () => {
    const address = [7, 42, 1, 255]; // random

    for (let i = 0; i < address.length; i++) {
      const input = await screen.findByLabelText('address-part-' + i);
      await userEvent.type(input, address[i].toString());
    }

    expect(addressChange).toHaveBeenCalledWith(
      Utils.IpAddressToNumber(address),
    );
  });
});
