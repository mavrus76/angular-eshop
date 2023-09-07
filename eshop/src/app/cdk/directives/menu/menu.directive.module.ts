import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDirective } from './menu.directive';
import { MenuContainerDirective } from './menu-container.directive';

@NgModule({
  declarations: [MenuDirective, MenuContainerDirective],
  imports: [CommonModule],
  exports: [MenuDirective, MenuContainerDirective],
})
export class MenuDirectiveModule {}
