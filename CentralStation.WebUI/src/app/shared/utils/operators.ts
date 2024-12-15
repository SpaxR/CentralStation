import {
  catchError,
  EMPTY,
  Observable,
  ObservableInput,
  ObservedValueOf,
  OperatorFunction,
} from 'rxjs';

/**
 * Catches any error and completes the observable-pipe
 * @param selector Callback to execute on error
 */
export function catchAndStopError<T>(
  selector?: (err: any, caught: Observable<T>) => void,
): OperatorFunction<T, any> {
  return catchError<T, any>((...args) => {
    selector?.(...args);
    return EMPTY;
  });
}

/**
 * Catches any error and switches to another observable in case of an error.
 * @param forward Observable to switch to
 * @param selector Callback to execute on error
 */
export function switchError<T, O extends ObservableInput<any>>(
  forward: O,
  selector?: (err: any, caught: Observable<T>) => void,
): OperatorFunction<T, T | ObservedValueOf<O>> {
  return catchError((...args) => {
    selector?.(...args);
    return forward;
  });
}
