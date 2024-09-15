import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiceProxiesModule } from './shared/service-proxies/service-proxies.module';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ServiceProxiesModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CentralStation';
}
