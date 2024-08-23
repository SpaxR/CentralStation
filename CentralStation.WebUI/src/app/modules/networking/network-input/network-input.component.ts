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
      if (this.address) {
        this.setAddressParts(this.address);
      } else {
        this.parts = [0, 0, 0, 0];
      }
    }
  }

  private setAddressParts(address: number) {
    this.parts[0] = (address >> 24) & 255;
    this.parts[1] = (address >> 16) & 255;
    this.parts[2] = (address >> 8) & 255;
    this.parts[3] = address & 255;
  }

  protected onAddressChanged() {
    let result = 0;
    result += this.parts[0] << 24;
    result += this.parts[1] << 16;
    result += this.parts[2] << 8;
    result += this.parts[3];

    this.addressChange.emit(result);
  }

  protected onFocus(event: Event) {
    (event.target as HTMLInputElement).select();
  }
}
