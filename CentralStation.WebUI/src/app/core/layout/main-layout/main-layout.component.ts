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
    { label: 'Dashboard', routerLink: '/' },
    { label: 'Networking', routerLink: '/networking' },
    { label: 'Kitchen', routerLink: '/cooking' },
    { label: 'Pantry', routerLink: '/pantry' },
  ];
}
