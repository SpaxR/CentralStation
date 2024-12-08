// import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';

// import { NetworkEditFormComponent } from './network-edit-form.component';
// import { Utils } from '../utils';
// import { NetworkInputComponent } from '../network-input/network-input.component';

import {render} from "@testing-library/angular";
import {NetworkEditFormComponent} from "./network-edit-form.component";

describe('NetworkEditFormComponent', () => {
//   let component: NetworkEditFormComponent;
//   let fixture: ComponentFixture<NetworkEditFormComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [NetworkEditFormComponent],
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(NetworkEditFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  it('should create', () => {
    const component = render(NetworkEditFormComponent);
    expect(component).toBeTruthy();
  });

//   it('should update network when display-name changes', fakeAsync(() => {
//     const value = 'Test-DisplayName';
//
//     const input = <HTMLInputElement>(
//       fixture.debugElement.query(By.css('[pInputText]')).nativeElement
//     );
//
//     input.value = value;
//     input.dispatchEvent(new Event('input'));
//
//     expect(component.network.displayName).toBe(value);
//   }));
//
//   it('should update network when address changes', () => {
//     const address = Utils.IpAddressToNumber([7, 7, 7, 7]);
//     const input = <NetworkInputComponent>(
//       fixture.debugElement.query(By.css('[data-testid=address-input]'))
//         .componentInstance
//     );
//
//     input.addressChange.emit(address);
//
//     expect(component.network.address).toEqual(address);
//   });
//
//   it('should update network when subnet changes', () => {
//     const subnet = Utils.IpAddressToNumber([42, 42, 42, 42]);
//     const input = <NetworkInputComponent>(
//       fixture.debugElement.query(By.css('[data-testid=subnet-input]'))
//         .componentInstance
//     );
//
//     input.addressChange.emit(subnet);
//
//     expect(component.network.subnet).toEqual(subnet);
//   });
});
