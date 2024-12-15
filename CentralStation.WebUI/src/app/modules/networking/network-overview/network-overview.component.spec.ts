import { render, RenderResult, screen } from '@testing-library/angular';
import { NetworkOverviewComponent } from './network-overview.component';
import { Utils } from '../utils';
import { NetworkDto } from '../../../shared/service-proxies/service-proxies';

describe('NetworkOverviewComponent', () => {
  let component: RenderResult<NetworkOverviewComponent>;

  //   let table: DebugElement<Table>;
  //   let service: jasmine.SpyObj<NetworkOverviewService>;
  //
  //   let networks$: Subject<NetworkDto[]>;
  //   let isLoading$: Subject<boolean>;
  //
  beforeEach(async () => {
    component = await render(NetworkOverviewComponent);
    //     networks$ = new Subject<NetworkDto[]>();
    //     isLoading$ = new Subject<boolean>();
    //     service = jasmine.createSpyObj<NetworkOverviewService>(
    //       {
    //         load: undefined,
    //         createNetwork: undefined,
    //         deleteNetwork: undefined,
    //       },
    //       {
    //         networks$: networks$.asObservable(),
    //         isLoading$: isLoading$.asObservable(),
    //       },
    //     );
    //     table = fixture.debugElement.query(testId('network-table'));
  });

  it('should NOT show error-message', async () => {
    const message = screen.queryByRole('alert');
    expect(message).toBeNull();
  });

  describe('when loading networks', () => {
    it('should show loading spinner', () => {
      //       isLoading$.next(true);
      //       fixture.detectChanges();
      //       expect(table.componentInstance.loading).toBeTrue();
    });
  });

  describe('given empty networks-list', () => {
    it('should show empty-message', () => {
      //       networks$.next([]);
      //       const text = table.nativeElement.innerText.toLowerCase();
      //       expect(text).toContain('No Networks'.toLowerCase());
    });
  });

  describe('given networks loaded', () => {
    const networks = [
      new NetworkDto({
        id: 0,
        address: Utils.IpAddressToNumber([7, 7, 7, 7]),
        subnet: Utils.IpAddressToNumber([42, 42, 42, 42]),
        displayName: 'Test-Network 1',
      }),
      new NetworkDto({
        id: 1,
        address: Utils.IpAddressToNumber([8, 8, 8, 8]),
        subnet: Utils.IpAddressToNumber([43, 43, 43, 43]),
        displayName: 'Test-Network 2',
      }),
      new NetworkDto({
        id: 2,
        address: Utils.IpAddressToNumber([9, 9, 9, 9]),
        subnet: Utils.IpAddressToNumber([44, 44, 44, 44]),
        displayName: 'Test-Network 3',
      }),
    ];

    //     beforeEach(fakeAsync(() => {
    //       networks$.next(networks);
    //       tick(environment.loadingThreshold);
    //       fixture.detectChanges();
    //     }));

    it('should hide loading spinner', () => {
      //       expect(table.componentInstance.loading).toBeFalse();
    });

    it('should show networks', () => {
      //       const rows = table.queryAll(By.css('tbody tr'));
      //       expect(rows.length).toBe(networks.length);
    });

    networks.forEach((network) => {
      describe('Network ' + network.displayName, () => {
        //         let row: DebugElement;

        beforeEach(() => {
          //           row = table.query(testId('network-' + network.id));
        });

        it(`should show name, address, subnet, and actions`, () => {
          //           const headerData = table
          //             .queryAll(By.css('thead tr th'))
          //             .map((td) => td.nativeElement.innerHTML.toLowerCase());
          //           const rowData = row
          //             .queryAll(By.css('td'))
          //             .map((td) => td.nativeElement.innerText.toLowerCase());
          //
          //           expect(headerData).toEqual(['name', 'address', 'subnet', 'action']);
          //           expect(rowData).toEqual([
          //             network.displayName!.toLowerCase(),
          //             Utils.NumberToIpAddress(network.address!).join('.'),
          //             Utils.NumberToIpAddress(network.subnet!).join('.'),
          //             jasmine.any(String),
          //           ]);
        });

        describe(`when delete clicked`, () => {
          it('should delete network', () => {
            //             row.query(testId('delete-network')).nativeElement.click();
            //
            //             expect(service.deleteNetwork).toHaveBeenCalledWith(network.id!);
          });
        });

        describe(`when name clicked`, () => {
          it('should navigate to network details', () => {
            //             const router = TestBed.inject(Router);
            //             const button = row.query(By.css('td :first-child'));
            //
            //             button.nativeElement.click();
            //             tick();
            //
            //             expect(router.url).toBe('/network/' + network.id);
          });
        });
      });
    });
  });

  describe('given error on load', () => {
    //     const error = new Error('TEST Error');

    beforeEach(() => {
      //       networks$.error(error);
      //       fixture.detectChanges();
    });

    it('should show error-message', () => {
      //       const content = fixture.debugElement.query(testId('error-message'))
      //         .nativeElement.innerText;
      //
      //       expect(content).toEqual(error.message);
    });

    it('should hide loading-spinner', () => {
      //       expect(table.componentInstance.loading).toBeFalse();
    });

    describe('when reload clicked', () => {
      it('should hide error-message', () => {
        //         let reloadIcon = fixture.debugElement.query(testId('reload-icon'));
        //
        //         reloadIcon.nativeElement.click();
        //         fixture.detectChanges();
        //
        //         const errorMessage = fixture.debugElement.query(
        //           testId('error-message'),
        //         );
        //         expect(errorMessage).toBeFalsy();
      });
    });
  });

  describe('when reload clicked', () => {
    //     let reloadIcon: DebugElement<Button>;

    beforeEach(() => {
      //       fixture.detectChanges();
      //       networks$.next([]);
      //       tick(environment.loadingThreshold);
      //       reloadIcon = fixture.debugElement.query(testId('reload-icon'));
    });

    it('should reload networks', () => {
      //       const network = new NetworkDto({ displayName: 'Different Network' });
      //
      //       reloadIcon.nativeElement.click();
      //       networks$.next([network]);
      //       tick(environment.loadingThreshold);
      //       fixture.detectChanges();
      //
      //       expect(service.load).toHaveBeenCalled();
      //       const content = table.query(By.css('tbody tr')).nativeElement.textContent;
      //       expect(content).toContain(network.displayName!);
    });
  });

  describe('when create-network clicked', () => {
    it('should create network', () => {
      //       const button = fixture.debugElement.query(testId('create-network'));
      //
      //       button.nativeElement.querySelector('button')?.click();
      //       fixture.detectChanges();
      //
      //       expect(service.createNetwork).toHaveBeenCalled();
    });
  });
});
