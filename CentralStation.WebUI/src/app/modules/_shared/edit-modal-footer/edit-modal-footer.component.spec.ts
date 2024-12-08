import { EditModalFooterComponent } from './edit-modal-footer.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';

describe('EditModalFooterComponent', () => {
  it('should create', async () => {
    await render(EditModalFooterComponent, {
      providers: [
        { provide: DynamicDialogRef, useValue: { close: jest.fn() } },
      ],
    });

    expect(screen.getByTestId('cancel-button'));
    expect(screen.getByTestId('save-button'));
  });

  describe('when cancelled', () => {
    it('should close modal with undefined', async () => {
      const user = userEvent.setup();
      const dialogRef = { close: jest.fn() };
      await render(EditModalFooterComponent, {
        providers: [{ provide: DynamicDialogRef, useValue: dialogRef }],
      });

      const button = screen.getByTestId('cancel-button').querySelector('button')!;
      await user.click(button);

      expect(dialogRef.close).toHaveBeenCalledWith(undefined);
    });
  });

  describe('when saved', () => {
    it('should close modal with true', async () => {
      const user = userEvent.setup();
      const dialogRef = { close: jest.fn() };
      await render(EditModalFooterComponent, {
        providers: [{ provide: DynamicDialogRef, useValue: dialogRef }],
      });

      const button = screen.getByTestId('save-button').querySelector('button')!;
      await user.click(button);

      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });
});
