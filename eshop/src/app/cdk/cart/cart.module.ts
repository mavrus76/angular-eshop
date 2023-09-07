import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { ButtonModule } from '../button/button.module';
import { CartService } from 'src/app/services/cart.service';
import { DragModule } from '../directives/draganddrop/draganddrop.directive.module';
import { OnClickOutDirectiveModule } from '../directives/onClickOut/on-click-out.directive.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, ButtonModule, DragModule, OnClickOutDirectiveModule],
  exports: [CartComponent],
  providers: [CartService],
})
export class CartModule {}
