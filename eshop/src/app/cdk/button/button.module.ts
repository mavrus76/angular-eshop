import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ButtonIconComponent } from './button-icon.component';
import { FlatButtonComponent } from './flat-button.component';

@NgModule({
  declarations: [ButtonComponent, ButtonIconComponent, FlatButtonComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, ButtonIconComponent, FlatButtonComponent],
})
export class ButtonModule {}
