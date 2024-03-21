import {Component} from '@angular/core';
import {
  CreateNetworkDto,
  NetworkDto,
  NetworkProxy,
  PaginationOptions
} from "../../../shared/service-proxies/service-proxies";
import {FormsModule} from "@angular/forms";
import {catchError, EMPTY, Observable, startWith, Subject, switchMap, tap} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {TemplateTypeDirective} from "../../../shared/directives/template-type.directive";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-networking',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    NgIf,
    TemplateTypeDirective,
    RouterLink
  ],
  templateUrl: './network-overview.component.html',
  styleUrl: './network-overview.component.scss'
})
export class NetworkOverviewComponent {

  newNetwork = new CreateNetworkDto();

  networks: Observable<NetworkDto[]>;

  isLoadingNetworks = false;
  loadingNetworksError?: string;

  private reloadNetworks = new Subject<void>();

  constructor(private proxy: NetworkProxy) {
    this.isLoadingNetworks = true;
    this.networks = this.reloadNetworks.pipe(
      startWith(undefined),
      tap(() => {
        this.loadingNetworksError = undefined;
        this.isLoadingNetworks = true;
      }),
      switchMap(() => proxy.getAll(new PaginationOptions({pageIndex: 0, pageSize: 10}))),
      catchError(error => {
        this.isLoadingNetworks = false;
        this.loadingNetworksError = error.message;
        return EMPTY;
      }),
      tap(() => this.isLoadingNetworks = false),
    )
  }

  createNetwork() {
    this.proxy.createNetwork(new CreateNetworkDto({
      displayName: this.newNetwork.displayName,
      address: this.newNetwork.address,
      subnet: this.newNetwork.subnet,
    }))
      .pipe(tap(() => this.newNetwork = new NetworkDto()))
      .subscribe(() => this.reloadNetworks.next());

  }

  deleteNetwork(id: number) {
    this.proxy.deleteNetwork(id).subscribe(() => this.reloadNetworks.next())
  }
}
