import { EditModalFooterComponent } from './edit-modal-footer.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { render, screen } from '@testing-library/angular';
import { UserEvent, userEvent } from '@testing-library/user-event';

describe('EditModalFooterComponent', () => {
  let dialogRef: Partial<DynamicDialogRef>;
  let user: UserEvent;

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

      await user.click(button);

      expect(dialogRef.close).toHaveBeenCalledWith(undefined);
    });
  });

  describe('when save clicked', () => {
    it('should close modal with true', async () => {
      const button = screen.getByRole('button', { name: 'Save' });

      await user.click(button);

      expect(dialogRef.close).toHaveBeenCalledWith(true);
    });
  });
});
