import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Button} from "primeng/button";

@Component({
  selector: 'app-edit-modal-footer',
  standalone: true,
  imports: [Button],
  templateUrl: './edit-modal-footer.component.html',
  styleUrl: './edit-modal-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditModalFooterComponent {}
