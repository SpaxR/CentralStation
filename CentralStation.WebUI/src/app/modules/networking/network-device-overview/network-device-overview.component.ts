import {Component} from '@angular/core';
import {
  CreateNetworkDeviceDto,
  NetworkDeviceDto,
  NetworkDeviceProxy,
  NetworkDto,
  NetworkProxy,
  PaginationOptions
} from "../../../shared/service-proxies/service-proxies";
import {Observable, startWith, Subject, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-network-device-overview',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    ButtonModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputNumberModule,
    InputTextModule
  ],
  templateUrl: './network-device-overview.component.html',
  styleUrl: './network-device-overview.component.scss'
})
export class NetworkDeviceOverviewComponent {

  network: Observable<NetworkDto>;
  devices: Observable<NetworkDeviceDto[]>

  newNetworkDevice = new CreateNetworkDeviceDto();

  private reloadDevices = new Subject<void>();

  private networkId: number;

  constructor(route: ActivatedRoute, networkProxy: NetworkProxy, private deviceProxy: NetworkDeviceProxy) {
    this.networkId = Number(route.snapshot.paramMap.get('network-id'));

    this.network = networkProxy.get(this.networkId);

    this.devices = this.reloadDevices.pipe(
      startWith(undefined),
      switchMap(() => deviceProxy.getNetworkDevices(this.networkId, new PaginationOptions({
        pageIndex: 0,
        pageSize: 10
      })))
    );
  }

  createNetworkDevice() {
    this.newNetworkDevice.networkId = this.networkId;

    this.deviceProxy.createNetworkDevice(this.newNetworkDevice)
      .subscribe(() => this.reloadDevices.next())
  }
}
