import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, ButtonModule],
  exports: [CounterComponent],
})
export class CounterModule {}
