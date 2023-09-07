import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CardModule } from '../cdk/card/card.module';
import { FormsModule } from '@angular/forms';
import { ToggleModule } from '../cdk/toggle/toggle.module';
import { CommentModule } from '../cdk/comment/comment.module';
import { ButtonModule } from '../cdk/button/button.module';
import { CartModule } from '../cdk/cart/cart.module';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ToggleModule,
    CartModule,
    ProductRoutingModule,
    CommentModule,
    ButtonModule,
  ],
  exports: [ProductComponent],
})
export class ProductModule {}
