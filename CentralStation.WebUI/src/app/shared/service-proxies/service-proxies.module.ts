import { Provider } from '@angular/core';
import * as Proxy from './service-proxies';
import { API_BASE_URL } from './service-proxies';
import { environment } from '../../../environments/environment';

export function provideProxies(): Provider[] {
  return [
    Proxy.NetworkProxy,
    Proxy.NetworkDeviceProxy,
    { provide: API_BASE_URL, useValue: environment.backendUrl },
  ];
}
