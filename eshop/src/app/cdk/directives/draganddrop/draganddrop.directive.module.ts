import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDirective } from './draganddrop.directive';

@NgModule({
  declarations: [DragDirective],
  imports: [CommonModule],
  exports: [DragDirective],
})
export class DragModule {}
