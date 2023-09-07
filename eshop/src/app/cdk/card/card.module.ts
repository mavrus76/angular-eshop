import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';
import { BadgeComponent } from './badge/badge.component';
import { CardComponent } from './card.component';
import { RatesComponent } from './rates/rates.component';
import { PriceComponent } from './price/price.component';
import { ColorOptionComponent } from './color-option/color-option.component';
import { DeliveryOptionsComponent } from './delivery-options/delivery-options.component';
import { DragModule } from '../directives/draganddrop/draganddrop.directive.module';
import { CardInfoComponent } from './card-info.component';

@NgModule({
  declarations: [
    CardComponent,
    BadgeComponent,
    RatesComponent,
    PriceComponent,
    ColorOptionComponent,
    DeliveryOptionsComponent,
    CardInfoComponent,
  ],
  imports: [CommonModule, ButtonModule, DragModule],
  exports: [CardComponent, CardInfoComponent],
})
export class CardModule {}
