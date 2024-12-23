import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'cs-main-layout',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  menu: MenuItem[] = [
    { label: 'dashboard' },
    { label: 'networks' },
    { label: 'recipes' },
    { label: 'pantry' },
  ];
}
