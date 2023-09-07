import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';
import { MenuModule } from '../menu/menu.module';
import { DropdownComponent } from './dropdown.component';

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule, ButtonModule, MenuModule],
  exports: [DropdownComponent],
})
export class DropdownModule {}
