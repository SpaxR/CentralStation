import {NgModule} from '@angular/core';
import * as Proxy from './service-proxies';
import {API_BASE_URL} from "./service-proxies";
import {environment} from "../../environments/environment";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports:[
    HttpClientModule,
  ],
  providers: [
    Proxy.NetworkProxy,
    Proxy.NetworkDeviceProxy,
    {provide: API_BASE_URL, useValue: environment.backendUrl}
  ]
})
export class ServiceProxiesModule {
}
