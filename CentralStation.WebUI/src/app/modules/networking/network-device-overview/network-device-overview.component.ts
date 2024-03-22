import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import {Observable, startWith, Subject, switchMap, tap} from "rxjs";

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

  private reloadDevices = new Subject<void>();

  private readonly networkId: number;

  isLoadingDevices = false;
  loadingDevicesError?: string;

  constructor(route: ActivatedRoute, networkProxy: NetworkProxy, private deviceProxy: NetworkDeviceProxy) {
    this.networkId = Number(route.snapshot.paramMap.get('network-id'));

    this.network = networkProxy.get(this.networkId);

    this.devices = this.reloadDevices.pipe(
      startWith(undefined),
      tap(() => {
        this.loadingDevicesError = undefined;
        this.isLoadingDevices = true;
      }),
      switchMap(() => deviceProxy.getNetworkDevices(this.networkId, new PaginationOptions({
        pageIndex: 0,
        pageSize: 10
      }))),
      tap(() => this.isLoadingDevices = false)
    );
  }

  createNetworkDevice() {
    this.newNetworkDevice.networkId = this.networkId;

    this.deviceProxy.createNetworkDevice(this.newNetworkDevice)
      .subscribe(() => this.reloadDevices.next())
  }

  deleteDevice(id: number) {
    this.deviceProxy.deleteNetworkDevice(id).subscribe(() => this.reloadDevices.next())
  }
}
