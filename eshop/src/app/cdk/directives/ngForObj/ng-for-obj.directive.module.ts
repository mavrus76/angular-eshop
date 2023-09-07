import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForObjDirective } from './ng-for-obj.directive';

@NgModule({
  declarations: [NgForObjDirective],
  imports: [CommonModule],
  exports: [NgForObjDirective],
})
export class NgForObjDirectiveModule {}
