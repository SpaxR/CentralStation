import {NgModule} from '@angular/core';
import {AsyncPipe, CommonModule, NgFor, NgForOf, NgIf} from '@angular/common';
import {TemplateTypeDirective} from "./directives/template-type.directive";

const common: NgModule['imports'] & NgModule['exports'] = [
  CommonModule,
  NgIf,
  NgFor,
  NgForOf,
  AsyncPipe,

  TemplateTypeDirective,
];

@NgModule({imports: common, exports: common,})
export class SharedModule {
}
