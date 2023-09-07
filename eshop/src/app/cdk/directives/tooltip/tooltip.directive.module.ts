import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipContainerDirective } from './tooltip-container.directive';

@NgModule({
  declarations: [TooltipDirective, TooltipContainerDirective],
  imports: [CommonModule],
  exports: [TooltipDirective, TooltipContainerDirective],
})
export class TooltipDirectiveModule {}
