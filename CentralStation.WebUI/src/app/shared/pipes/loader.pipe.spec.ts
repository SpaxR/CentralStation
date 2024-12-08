// import { LoaderPipe } from './loader.pipe';
// import { of } from 'rxjs';
// import { fakeAsync, tick } from '@angular/core/testing';
// import { environment } from '../../../environments/environment';

import {LoaderPipe} from "./loader.pipe";

describe('LoaderPipe', () => {
//   let pipe: LoaderPipe;
//
//   beforeEach(() => {
//     pipe = new LoaderPipe();
//   });
//
//   function transform(value: boolean, delay?: number): boolean | undefined {
//     let result: boolean | undefined;
//
//     pipe
//       .transform(of(value), delay)
//       .subscribe((isLoading) => (result = isLoading));
//
//     return result;
//   }

  it('create an instance', () => {
    const pipe = new LoaderPipe();
    expect(pipe).toBeTruthy();
  });

//   it('should emit directly when true', () => {
//     const result = transform(true);
//
//     expect(result).toBeTrue();
//   });
//
//   it('should delay when false', fakeAsync(() => {
//     let result: boolean | undefined;
//
//     pipe.transform(of(false)).subscribe((isLoading) => (result = isLoading));
//
//     expect(result).toBeUndefined(); // Initial
//     tick(environment.loadingThreshold - 1);
//     expect(result).toBeUndefined(); // Up to default
//     tick(1);
//     expect(result).toBeFalse(); // After delay
//   }));
//
//   it('should use custom delay when false', fakeAsync(() => {
//     let result: boolean | undefined;
//
//     pipe
//       .transform(of(false), environment.loadingThreshold + 1)
//       .subscribe((isLoading) => (result = isLoading));
//
//     expect(result).toBeUndefined(); // Initial
//     tick(environment.loadingThreshold);
//     expect(result).toBeUndefined(); // Up to default
//     tick(1);
//     expect(result).toBeFalse(); // After delay
//   }));
});
