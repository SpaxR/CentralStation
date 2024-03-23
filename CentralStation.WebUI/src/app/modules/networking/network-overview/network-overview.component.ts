import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {MessageService} from "primeng/api";
import {catchError, defer, delay, EMPTY, finalize, Observable, repeat, Subject, tap} from "rxjs";

import {
  CreateNetworkDto,
  NetworkDto,
  NetworkProxy,
  PaginationOptions
} from "../../../shared/service-proxies/service-proxies";
import {TemplateTypeDirective} from "../../../shared/directives/template-type.directive";
import {SharedModule} from "../../../shared/shared.module";

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
  ],
  templateUrl: './network-overview.component.html',
  styleUrl: './network-overview.component.scss'
})
export class NetworkOverviewComponent {

  networks: Observable<NetworkDto[]>;

  newNetwork = new CreateNetworkDto();

  isLoadingNetworks = false;
  loadingNetworksError?: string;

  private reloadNetworks = new Subject<void>();

  constructor(private proxy: NetworkProxy, private messages: MessageService) {
    this.networks = defer(() => {
      this.loadingNetworksError = undefined;
      this.isLoadingNetworks = true;
      return proxy.getAll(new PaginationOptions({pageIndex: 0, pageSize: 10}));
    }).pipe(
      delay(300 /* TODO Add Time-Library and use DateTime */),
      finalize(() => this.isLoadingNetworks = false),
      catchError(error => {
        this.messages.add({severity: 'error', summary: 'Loading Failed', detail: error.message})
        this.loadingNetworksError = error.message;
        return EMPTY;
      }),
      repeat({delay: () => this.reloadNetworks}),
    )
  }

  createNetwork() {
    this.proxy.createNetwork(this.newNetwork)
      .pipe(
        finalize(() => this.reloadNetworks.next()),
        tap(() => this.newNetwork = new NetworkDto()),
        catchError(error => {
          this.messages.add({severity: 'error', summary: 'Creation failed', detail: error.message});
          return EMPTY;
        }))
      .subscribe(() => this.messages.add({severity: 'success', summary: 'Network Created'}));
  }

  deleteNetwork(id: number) {
    this.proxy.deleteNetwork(id)
      .pipe(
        finalize(() => this.reloadNetworks.next()),
        catchError(error => {
          this.messages.add({severity: 'error', summary: 'Deletion failed', detail: error.message});
          return EMPTY;
        }),
      ).subscribe(() =>
      this.messages.add({severity: 'info', summary: 'Successfully deleted'})
    )
  }

  triggerReload() {
    this.reloadNetworks.next();
  }
}
