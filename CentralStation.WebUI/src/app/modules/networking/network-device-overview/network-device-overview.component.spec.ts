import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';

import { ServiceProxiesModule } from '../../../shared/service-proxies/service-proxies.module';
import { NetworkDeviceOverviewComponent } from './network-device-overview.component';

describe('NetworkDeviceOverviewComponent', () => {
  let component: NetworkDeviceOverviewComponent;
  let fixture: ComponentFixture<NetworkDeviceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NetworkDeviceOverviewComponent,
        ServiceProxiesModule,
        RouterModule.forRoot([]),
      ],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkDeviceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
