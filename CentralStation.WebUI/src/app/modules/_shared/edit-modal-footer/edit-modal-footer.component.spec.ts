import { EditModalFooterComponent } from './edit-modal-footer.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';

describe('EditModalFooterComponent', () => {
  let dialogRef: Partial<DynamicDialogRef>;

  beforeEach(() =>
    render(EditModalFooterComponent, {
      providers: [
        {
          provide: DynamicDialogRef,
          useValue: (dialogRef = { close: jest.fn() }),
        },
      ],
    }),
  );

  describe('when cancel clicked', () => {
    it('should close modal with undefined', async () => {
      const button = screen.getByRole('button', { name: `Cancel` });

      await userEvent.click(button);

      expect(dialogRef.close).toHaveBeenCalledWith(undefined);
    });
  });

  describe('when save clicked', () => {
    it('should close modal with true', async () => {
      const button = screen.getByRole('button', { name: 'Save' });

      await userEvent.click(button);

      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });
});
