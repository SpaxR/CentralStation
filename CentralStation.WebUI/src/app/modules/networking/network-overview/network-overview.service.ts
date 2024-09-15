import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import {
  IPaginationOptions,
  NetworkDto,
  NetworkProxy,
  PaginationOptions,
} from '../../../shared/service-proxies/service-proxies';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  filter,
  finalize,
  ReplaySubject,
} from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { NetworkEditFormComponent } from '../network-edit-form/network-edit-form.component';

@Injectable()
export class NetworkOverviewService {
  private networks = new ReplaySubject<NetworkDto[]>();
  public networks$ = this.networks.asObservable();

  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

  constructor(
    private proxy: NetworkProxy,
    private messages: MessageService,
    private dialogs: DialogService,
    private confirmation: ConfirmationService,
  ) {
    this.load(new PaginationOptions());
  }

  load(options: IPaginationOptions) {
    this.isLoading.next(true);
    this.proxy
      .getAll(new PaginationOptions(options))
      .pipe(
        finalize(() => this.isLoading.next(false)),
        catchError((error) => {
          console.error(error);
          this.networks.error(error);
          this.messages.add({
            severity: 'error',
            summary: 'Load failed',
            detail: 'Loading of Networks failed',
          });
          return EMPTY;
        }),
      )

      .subscribe((networks) => this.networks.next(networks));
  }

  createNetwork() {
    const ref = this.dialogs.open(NetworkEditFormComponent, {});

    ref.onClose.pipe(filter((result) => !!result)).subscribe((result) => {
      this.proxy
        .createNetwork(result)
        .pipe(
          catchError((error) => {
            console.error(error);
            this.messages.add({
              summary: 'Creation failed',
              detail: 'Failed to create Network',
              severity: 'error',
            });
            return EMPTY;
          }),
        )
        .subscribe(() => {
          this.messages.add({
            summary: 'Network created',
            detail: 'Network successfully created',
            severity: 'success',
          });
        });
    });

    //   this.proxy.createNetwork(this.newNetwork)
    //     .pipe(
    //       finalize(() => this.reloadNetworks.next()),
    //       tap(() => (this.newNetwork = new NetworkDto()))
    //     )
  }

  deleteNetwork(id: number) {
    this.confirmation.confirm({
      header: 'Confirm Deletion',
      message: 'Do you want to delete?',
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      accept: () => {
        this.proxy
          .deleteNetwork(id)
          .pipe(
            catchError((error) => {
              console.error(error);
              this.messages.add({
                summary: 'Deletion failed',
                detail: 'Failed to delete network',
                severity: 'error',
              });
              return EMPTY;
            }),
          )
          .subscribe(() =>
            this.messages.add({
              summary: 'Success',
              detail: 'Network has been deleted',
              severity: 'success',
            }),
          );
      },
    });

    //   this.proxy.deleteNetwork(id)
    //     .pipe(
    //       finalize(() => this.reloadNetworks.next())
    //     )
  }
}
