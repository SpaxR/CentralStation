import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { NetworkInputComponent } from '../network-input/network-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NetworkDto } from '../../../shared/service-proxies/service-proxies';

@Component({
  selector: 'app-network-edit-form',
  standalone: true,
  imports: [
    Button,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    NetworkInputComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './network-edit-form.component.html',
  styleUrl: './network-edit-form.component.scss',
})
export class NetworkEditFormComponent {
  @Input() set network(value: NetworkDto) {
    this._network = new NetworkDto(value);
  }

  get network(): NetworkDto {
    return this._network;
  }
  private _network = new NetworkDto();
}
