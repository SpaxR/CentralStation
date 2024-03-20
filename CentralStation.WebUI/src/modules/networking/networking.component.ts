import {Component} from '@angular/core';
import {NetworkDto, NetworkProxy} from "../../shared/service-proxies/service-proxies";
import {FormsModule} from "@angular/forms";
import {Observable, startWith, Subject, switchMap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";

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
    InputGroupAddonModule
  ],
  templateUrl: './networking.component.html',
  styleUrl: './networking.component.scss'
})
export class NetworkingComponent {

  newNetwork: NetworkDto = new NetworkDto();

  networks: Observable<NetworkDto[]>;

  private reloadNetworks = new Subject<void>();

  constructor(private proxy: NetworkProxy) {
    this.networks = this.reloadNetworks.pipe(
      startWith(undefined),
      switchMap(() => proxy.getAll(0, 10))
    )
  }

  createNetwork() {
    this.proxy.createNetwork(this.newNetwork.displayName, this.newNetwork.address, this.newNetwork.subnet)
      .subscribe(() => this.reloadNetworks.next());

  }

  deleteNetwork(id: number) {
    this.proxy.deleteNetwork(id).subscribe(() => this.reloadNetworks.next())
  }
}