import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { ServiceProxiesModule } from '../../../shared/service-proxies/service-proxies.module';
import { NetworkOverviewComponent } from './network-overview.component';

describe('NetworkOverviewComponent', () => {
  let component: NetworkOverviewComponent;
  let fixture: ComponentFixture<NetworkOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkOverviewComponent, ServiceProxiesModule],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
