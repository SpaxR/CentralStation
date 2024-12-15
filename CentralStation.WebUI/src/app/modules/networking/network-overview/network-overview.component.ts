import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PrimeIcons } from 'primeng/api';
import { catchError, Observable, of } from 'rxjs';

import {
  NetworkDto,
  PaginationOptions,
} from '../../../shared/service-proxies/service-proxies';
import { TemplateTypeDirective } from '../../../shared/directives/template-type.directive';
import { SharedModule } from '../../../shared/shared.module';
import { InputMaskModule } from 'primeng/inputmask';
import { NetworkInputComponent } from '../network-input/network-input.component';
import { NetworkEditFormComponent } from '../network-edit-form/network-edit-form.component';
import { IpAddressPipe } from '../../../shared/pipes/ip-address.pipe';
import { NetworkOverviewService } from './network-overview.service';
import { LoaderPipe } from '../../../shared/pipes/loader.pipe';

@Component({
  selector: 'app-networking',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    TemplateTypeDirective,
    RouterLink,
    InputMaskModule,
    NetworkInputComponent,
    NetworkEditFormComponent,
    IpAddressPipe,
    LoaderPipe,
  ],
  providers: [NetworkOverviewService],
  templateUrl: './network-overview.component.html',
  styleUrl: './network-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkOverviewComponent implements OnInit {
  networks$: Observable<NetworkDto[]>;
  errorMessage?: string;

  constructor(protected service: NetworkOverviewService) {
    this.networks$ = service.networks$.pipe(
      catchError((error) => {
        this.errorMessage = error.message;
        return of([]);
      }),
    );
  }

  ngOnInit() {
    // TODO
    // Check Pagination-Options
    // this.networks = proxy.getAll(new PaginationOptions({ pageIndex: 0, pageSize: 10 }));
  }

  createNetwork() {
    this.service.createNetwork();
  }

  deleteNetwork(id: number) {
    this.service.deleteNetwork(id);
  }

  triggerReload() {
    this.errorMessage = undefined;
    this.service.load(new PaginationOptions());
  }

  protected readonly PrimeIcons = PrimeIcons;
}
