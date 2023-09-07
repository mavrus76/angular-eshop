import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTooltipComponent } from './ui-tooltip.component';
import { UiTooltipContentComponent } from './ui-tooltip-content.component';
import { TooltipDirectiveModule } from '../directives/tooltip/tooltip.directive.module';

@NgModule({
  declarations: [UiTooltipComponent, UiTooltipContentComponent],
  imports: [CommonModule, TooltipDirectiveModule],
  exports: [UiTooltipComponent, UiTooltipContentComponent],
})
export class UiTooltipModule {}
