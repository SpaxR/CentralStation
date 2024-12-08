import { NgModule } from '@angular/core';
import { provideProxies } from '../src/app/shared/service-proxies/service-proxies.module';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports:[
    NoopAnimationsModule
  ],
  providers: [
    provideProxies(),
    provideHttpClient(),
    provideHttpClientTesting(),
  ],
})
export class TestModule {}
