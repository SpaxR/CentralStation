import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDeviceOverviewComponent } from './network-device-overview.component';

describe('NetworkDeviceOverviewComponent', () => {
  let component: NetworkDeviceOverviewComponent;
  let fixture: ComponentFixture<NetworkDeviceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkDeviceOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetworkDeviceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
