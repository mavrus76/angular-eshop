import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { FormModule } from '../cdk/form/form.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule, OrderRoutingModule, FormModule],
  exports: [OrderComponent],
})
export class OrderModule {}
