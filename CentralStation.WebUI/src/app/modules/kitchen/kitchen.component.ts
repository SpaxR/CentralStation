import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cs-kitchen',
  imports: [],
  standalone: true,
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenComponent {}
