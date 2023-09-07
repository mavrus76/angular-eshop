import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input.component';
import { InputDirective } from './input.directive';

@NgModule({
  declarations: [InputDirective, InputFieldComponent],
  imports: [CommonModule],
  exports: [InputDirective, InputFieldComponent],
})
export class InputModule {}
