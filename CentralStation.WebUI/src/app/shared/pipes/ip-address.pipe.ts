import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from '../../modules/networking/utils';

@Pipe({
  name: 'ipAddress',
  standalone: true,
})
export class IpAddressPipe implements PipeTransform {
  transform(value?: number): string {
    return Utils.NumberToIpAddress(value ?? 0).join('.');
  }
}
