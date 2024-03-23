import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {MessageService} from "primeng/api";
import {catchError, defer, delay, EMPTY, finalize, Observable, repeat, Subject, tap} from "rxjs";

import {
  CreateNetworkDeviceDto,
  NetworkDeviceDto,
  NetworkDeviceProxy,
  NetworkDto,
  NetworkProxy,
  PaginationOptions
} from "../../../shared/service-proxies/service-proxies";
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-network-device-overview',
  standalone: true,
  imports: [
    SharedModule,
    ButtonModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputNumberModule,
    InputTextModule,
    TableModule,
  ],
  templateUrl: './network-device-overview.component.html',
  styleUrl: './network-device-overview.component.scss'
})
export class NetworkDeviceOverviewComponent {

  network: Observable<NetworkDto>;
  devices: Observable<NetworkDeviceDto[]>

  newNetworkDevice = new CreateNetworkDeviceDto();

  isLoadingDevices = false;
  loadingDevicesError?: string;

  private readonly networkId: number;
  private reloadDevices = new Subject<void>();

  constructor(
    route: ActivatedRoute,
    networkProxy: NetworkProxy,
    private deviceProxy: NetworkDeviceProxy,
    private messages: MessageService
  ) {
    this.networkId = Number(route.snapshot.paramMap.get('network-id'));
    this.network = networkProxy.get(this.networkId);

    this.devices = defer(() => {
      this.loadingDevicesError = undefined;
      this.isLoadingDevices = true;
      return deviceProxy.getNetworkDevices(this.networkId, new PaginationOptions({pageIndex: 0, pageSize: 10}))
    }).pipe(
      delay(300 /* TODO Add Time-Library and use DateTime */),
      finalize(() => this.isLoadingDevices = false),
      catchError(error => {
        this.messages.add({severity: 'error', summary: 'Loading Failed', detail: error.message})
        this.loadingDevicesError = error.message;
        return EMPTY;
      }),
      repeat({delay: () => this.reloadDevices}),
    )
  }

  createNetworkDevice() {
    this.newNetworkDevice.networkId = this.networkId;

    this.deviceProxy.createNetworkDevice(this.newNetworkDevice)
      .pipe(
        finalize(() => this.reloadDevices.next()),
        tap(() => this.newNetworkDevice = new CreateNetworkDeviceDto()),
        catchError(error => {
          this.messages.add({severity: 'error', summary: 'Creation failed', detail: error.message});
          return EMPTY;
        })
      ).subscribe(() => this.messages.add({severity: 'success', summary: 'Device Created'}))
  }

  deleteDevice(id: number) {
    this.deviceProxy.deleteNetworkDevice(id)
      .pipe(
        finalize(() => this.reloadDevices.next()),
        catchError(error => {
          this.messages.add({severity: 'error', summary: 'Deletion failed', detail: error.message});
          return EMPTY;
        })
      ).subscribe(() =>
      this.messages.add({severity: 'info', summary: 'Successfully deleted'})
    );
  }

  triggerReload() {
    this.reloadDevices.next();
  }
}
