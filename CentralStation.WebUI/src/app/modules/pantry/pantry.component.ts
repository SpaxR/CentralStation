import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cs-pantry',
  imports: [],
  standalone: true,
  templateUrl: './pantry.component.html',
  styleUrl: './pantry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PantryComponent {}
