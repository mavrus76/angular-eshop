import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMenuComponent } from './ui-menu.component';
import { UiMenuContentComponent } from './ui-menu-content.component';
import { MenuDirectiveModule } from '../directives/menu/menu.directive.module';

@NgModule({
  declarations: [UiMenuComponent, UiMenuContentComponent],
  imports: [CommonModule, MenuDirectiveModule],
  exports: [UiMenuComponent, UiMenuContentComponent],
})
export class UiMenuModule {}
