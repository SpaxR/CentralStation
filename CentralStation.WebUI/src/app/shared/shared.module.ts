import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateTypeDirective } from './directives/template-type.directive';

const common: NgModule['imports'] & NgModule['exports'] = [
  CommonModule,
  TemplateTypeDirective,
];

@NgModule({ imports: common, exports: common })
export class SharedModule {}
