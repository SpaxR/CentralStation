import { fakeAsync, TestBed } from '@angular/core/testing';

import { NetworkOverviewService } from './network-overview.service';
import {
  Confirmation,
  ConfirmationService,
  Message,
  MessageService,
  PrimeIcons,
} from 'primeng/api';
import {
  CreateNetworkDto,
  IPaginationOptions,
  NetworkDto,
  NetworkProxy,
  PaginationOptions,
} from '../../../shared/service-proxies/service-proxies';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NetworkEditFormComponent } from '../network-edit-form/network-edit-form.component';
import { switchError } from '../../../shared/utils/operators';

describe('NetworkOverviewService', () => {
  let service: NetworkOverviewService;

  let proxy: jasmine.SpyObj<NetworkProxy>;
  let messages: jasmine.SpyObj<MessageService>;
  let dialogs: jasmine.SpyObj<DialogService>;
  let confirmation: jasmine.SpyObj<ConfirmationService>;

  let initialNetworks: NetworkDto[];

  beforeEach(() => {
    initialNetworks = [new NetworkDto({ id: 7 }), new NetworkDto({ id: 42 })];
    proxy = jasmine.createSpyObj<NetworkProxy>({
      getAll: of(initialNetworks),
      createNetwork: undefined,
      deleteNetwork: undefined,
    });
    messages = jasmine.createSpyObj(['add']);
    dialogs = jasmine.createSpyObj(['open']);
    confirmation = jasmine.createSpyObj(['confirm']);

    TestBed.configureTestingModule({
      providers: [
        NetworkOverviewService,
        { provide: NetworkProxy, useValue: proxy },
        { provide: MessageService, useValue: messages },
        { provide: DialogService, useValue: dialogs },
        { provide: ConfirmationService, useValue: confirmation },
      ],
    });
    service = TestBed.inject(NetworkOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be loading', fakeAsync(() => {
    let isLoading: boolean | undefined;
    service.isLoading$.subscribe((value) => (isLoading = value));

    expect(isLoading).toBeFalse();
  }));

  describe('load', () => {
    it('should initially provide first page', () => {
      let result: NetworkDto[] | undefined;

      service.networks$.subscribe((networks) => (result = networks));

      expect(proxy.getAll).toHaveBeenCalledWith(new PaginationOptions());
      expect(result).toEqual(initialNetworks);
    });

    it('should emit fetched networks', () => {
      const page = { pageIndex: 7, pageSize: 42 } as IPaginationOptions;
      let result: NetworkDto[] | undefined;
      const networks = [new NetworkDto(), new NetworkDto(), new NetworkDto()];
      proxy.getAll.and.returnValue(of(networks));
      service.networks$.subscribe((networks) => (result = networks));

      service.load(new PaginationOptions(page));

      expect(result).toEqual(networks);
      expect(proxy.getAll).toHaveBeenCalledWith(jasmine.objectContaining(page));
    });

    it('should emit loading-state while loading', () => {
      let isLoading = false;
      service.isLoading$.subscribe((loading) => (isLoading = loading));
      const response = new Subject<NetworkDto[]>();
      proxy.getAll.and.returnValue(response);

      service.load(new PaginationOptions());
      expect(isLoading).toBeTrue();

      response.next([]);
      response.complete();

      expect(isLoading).toBeFalse();
    });

    it('should emit loading false on error', () => {
      let isLoading = false;
      service.isLoading$.subscribe((loading) => (isLoading = loading));
      const response = new Subject<NetworkDto[]>();
      proxy.getAll.and.returnValue(response);

      service.load(new PaginationOptions());
      expect(isLoading).toBeTrue();

      response.error(new Error());

      expect(isLoading).toBeFalse();
    });

    describe('on error', () => {
      it('should forward errors', () => {
        let error: Error | undefined;
        proxy.getAll.and.returnValue(throwError(() => new Error()));

        service.networks$
          .pipe(switchError(EMPTY, (e) => (error = e)))
          .subscribe();
        service.load(new PaginationOptions());

        expect(error).toBeTruthy();
      });

      it('should display toast', () => {
        proxy.getAll.and.returnValue(throwError(() => new Error()));

        service.load(new PaginationOptions());

        expect(messages.add).toHaveBeenCalledWith(
          jasmine.objectContaining<Message>({
            summary: 'Load failed',
            detail: 'Loading of Networks failed',
            severity: 'error',
          }),
        );
      });
    });
  });

  describe('createNetwork', () => {
    let dialog: DynamicDialogRef;

    beforeEach(() => {
      dialog = new DynamicDialogRef();
      dialogs.open.and.returnValue(dialog);
    });

    it('should open edit-dialog', () => {
      service.createNetwork();

      expect(dialogs.open).toHaveBeenCalledWith(
        NetworkEditFormComponent,
        jasmine.objectContaining({}),
      );
    });

    it('should create network on confirm', () => {
      proxy.createNetwork.and.returnValue(EMPTY);
      const network = new CreateNetworkDto({
        address: 42,
        subnet: 43,
        displayName: 'Test-Network',
      });

      service.createNetwork();
      dialog.close(network);

      expect(proxy.createNetwork).toHaveBeenCalledWith(network);
    });

    it('should NOT create network on cancellation', () => {
      service.createNetwork();
      dialog.close();

      expect(proxy.createNetwork).not.toHaveBeenCalled();
    });

    it('should show success-toast after successful creation', () => {
      proxy.createNetwork.and.returnValue(of(7));

      service.createNetwork();
      dialog.close(new CreateNetworkDto());

      expect(messages.add).toHaveBeenCalledWith(
        jasmine.objectContaining<Message>({
          summary: 'Network created',
          detail: 'Network successfully created',
          severity: 'success',
        }),
      );
    });

    it('should show error-toast when creation fails', () => {
      proxy.createNetwork.and.returnValue(throwError(() => new Error()));

      service.createNetwork();
      dialog.close(new CreateNetworkDto());

      expect(messages.add).toHaveBeenCalledWith(
        jasmine.objectContaining<Message>({
          summary: 'Creation failed',
          detail: 'Failed to create Network',
          severity: 'error',
        }),
      );
    });

    it('should NOT show success-toast when creation fails', () => {
      proxy.createNetwork.and.returnValue(throwError(() => new Error()));

      service.createNetwork();
      dialog.close(new CreateNetworkDto());

      expect(messages.add).not.toHaveBeenCalledWith(
        jasmine.objectContaining<Message>({
          severity: 'success',
        }),
      );
    });
  });

  describe('deleteNetwork', () => {
    it('should show confirmation-dialog', () => {
      service.deleteNetwork(7);

      expect(confirmation.confirm).toHaveBeenCalledWith(
        jasmine.objectContaining<Confirmation>({
          header: 'Confirm Deletion',
          message: 'Do you want to delete?',
          icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        }),
      );
    });

    it('should delete network after confirmation', () => {
      const id = 7;
      const response = of(undefined);
      spyOn(response, 'subscribe');
      confirmation.confirm.and.callFake((args) => args.accept?.());
      proxy.deleteNetwork.and.returnValue(response);

      service.deleteNetwork(id);

      expect(proxy.deleteNetwork).toHaveBeenCalledWith(id);
      expect(response.subscribe).toHaveBeenCalled();
    });

    it('should show error-toast when deletion fails', () => {
      confirmation.confirm.and.callFake((args) => args.accept?.());
      proxy.deleteNetwork.and.returnValue(throwError(() => new Error()));

      service.deleteNetwork(7);

      expect(messages.add).toHaveBeenCalledWith(
        jasmine.objectContaining<Message>({
          summary: 'Deletion failed',
          detail: 'Failed to delete network',
          severity: 'error',
        }),
      );
    });

    it('should NOT show success-toast when deletion fails', () => {
      confirmation.confirm.and.callFake((args) => args.accept?.());
      proxy.deleteNetwork.and.returnValue(throwError(() => new Error()));

      service.deleteNetwork(7);

      expect(messages.add).not.toHaveBeenCalledWith(
        jasmine.objectContaining<Message>({ severity: 'success' }),
      );
    });

    it('should show success-toast after deletion', () => {
      confirmation.confirm.and.callFake((args) => args.accept?.());
      proxy.deleteNetwork.and.returnValue(of(undefined));

      service.deleteNetwork(7);

      expect(messages.add).toHaveBeenCalledWith(
        jasmine.objectContaining<Message>({
          summary: 'Success',
          detail: 'Network has been deleted',
          severity: 'success',
        }),
      );
    });

    it('should NOT delete network after cancellation', () => {
      confirmation.confirm.and.callFake((args) => args.reject?.());

      service.deleteNetwork(7);

      expect(proxy.deleteNetwork).not.toHaveBeenCalled();
    });
  });
});
