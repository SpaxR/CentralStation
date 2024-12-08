// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterModule } from '@angular/router';
// import { MessageService } from 'primeng/api';

// import { NetworkDeviceOverviewComponent } from './network-device-overview.component';
// import {TestModule} from "../../../../../tests/test.module";

import {render} from "@testing-library/angular";
import {NetworkDeviceOverviewComponent} from "./network-device-overview.component";

describe('NetworkDeviceOverviewComponent', () => {
//   let component: NetworkDeviceOverviewComponent;
//   let fixture: ComponentFixture<NetworkDeviceOverviewComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         NetworkDeviceOverviewComponent,
//         RouterModule.forRoot([]),
//         TestModule
//       ],
//       providers: [MessageService],
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(NetworkDeviceOverviewComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

  it('should create', () => {
    const component = render(NetworkDeviceOverviewComponent);
    expect(component).toBeTruthy();
  });
});
