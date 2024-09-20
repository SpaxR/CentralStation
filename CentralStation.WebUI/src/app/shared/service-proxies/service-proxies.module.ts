import {NgModule} from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import * as Proxy from './service-proxies';
import {API_BASE_URL} from "./service-proxies";
import {environment} from "../../../environments/environment";

@NgModule({ imports: [], providers: [
        Proxy.NetworkProxy,
        Proxy.NetworkDeviceProxy,
        { provide: API_BASE_URL, useValue: environment.backendUrl },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class ServiceProxiesModule {
}
