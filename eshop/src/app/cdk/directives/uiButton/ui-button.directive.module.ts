import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonDirective } from './ui-button.directive';

@NgModule({
  declarations: [UiButtonDirective],
  imports: [CommonModule],
  exports: [UiButtonDirective],
})
export class UiButtonDirectiveModule {}
