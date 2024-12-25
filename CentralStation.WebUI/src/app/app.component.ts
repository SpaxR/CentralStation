import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  menu: MenuItem[] = [
    { label: 'Dashboard', routerLink: '/' },
    { label: 'Networking', routerLink: '/networking' },
    { label: 'Kitchen', routerLink: '/cooking' },
    { label: 'Pantry', routerLink: '/pantry' },
  ];
}
