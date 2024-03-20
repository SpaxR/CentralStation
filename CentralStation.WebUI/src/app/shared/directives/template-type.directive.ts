import {Directive, Input} from '@angular/core';
import {Observable} from "rxjs";

@Directive({
  selector: '[templateType]',
  standalone: true
})
export class TemplateTypeDirective<T> {

  @Input('templateType') value!: T;

  static ngTemplateContextGuard<T>(_directive: TemplateTypeDirective<T>, _ctx: any): _ctx is {
    $implicit: StripArray<StripObservable<T>>;
  } {
    return true;
  }
}

type StripObservable<T> = T extends Observable<infer TO> ? TO : T;
type StripArray<T> = T extends Array<infer TA> ? TA : T;
