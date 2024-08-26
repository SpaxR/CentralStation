import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Utils } from '../utils';

@Component({
  selector: 'app-network-input',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    InputNumberModule,
  ],
  templateUrl: './network-input.component.html',
  styleUrl: './network-input.component.scss',
})
export class NetworkInputComponent implements OnChanges {
  @Input() address?: number;
  @Output() addressChange = new EventEmitter<number>();

  protected parts: [number, number, number, number] = [0, 0, 0, 0];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['address']) {
      this.parts = Utils.NumberToIpAddress(this.address ?? 0);
    }
  }

  protected onAddressChanged() {
    this.addressChange.emit(Utils.IpAddressToNumber(this.parts));
  }

  protected onFocus(event: Event) {
    (event.target as HTMLInputElement).select();
  }
}
