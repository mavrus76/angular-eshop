import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnClickOutDirective } from './on-click-out.directive';

@NgModule({
  declarations: [OnClickOutDirective],
  imports: [CommonModule],
  exports: [OnClickOutDirective],
})
export class OnClickOutDirectiveModule {}
