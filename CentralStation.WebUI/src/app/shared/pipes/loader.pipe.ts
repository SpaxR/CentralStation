import { Pipe, PipeTransform } from '@angular/core';
import { delay, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'loader',
  standalone: true,
})
export class LoaderPipe implements PipeTransform {
  transform(
    value: Observable<boolean>,
    delayTime?: number,
  ): Observable<boolean> {
    return value.pipe(
      switchMap((isLoading) =>
        isLoading
          ? of(isLoading)
          : of(isLoading).pipe(
              delay(delayTime ?? environment.loadingThreshold),
            ),
      ),
    );
  }
}
