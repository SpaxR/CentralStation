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
import {InputNumberInputEvent, InputNumberModule} from 'primeng/inputnumber';
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

  protected onAddressChanged(index:number,event:InputNumberInputEvent) {
    this.parts[index] = Math.min(Math.max(Number(event.value), 0), 255); // Clamp 0-255
    this.addressChange.emit(Utils.IpAddressToNumber(this.parts));
  }

  protected onFocus(event: Event) {
    (event.target as HTMLInputElement).select();
  }
}
