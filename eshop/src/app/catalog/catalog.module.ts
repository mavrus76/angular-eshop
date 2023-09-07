import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
// import { CardModule } from '../cdk/card/card.module';
import { ButtonModule } from '../cdk/button/button.module';
import { CartModule } from '../cdk/cart/cart.module';
import { ToggleModule } from '../cdk/toggle/toggle.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogService } from '../services/catalog.service';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { CardComponent } from './components/card/card.component';
import { PriceComponent } from './components/price/price.component';
import { RatesComponent } from './components/rates/rates.component';
import { DragModule } from '../cdk/directives/draganddrop/draganddrop.directive.module';
import { StoreModule } from '@ngrx/store';
import * as fromState from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/effects';

@NgModule({
  declarations: [
    CatalogComponent,
    CardComponent,
    PriceComponent,
    RatesComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CartModule,
    ToggleModule,
    CatalogRoutingModule,
    ButtonModule,
    DragModule,
    StoreModule.forFeature('catalog', fromState.reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  exports: [CatalogComponent, CardComponent],
  providers: [CatalogService, CartService, ProductsService],
})
export class CatalogModule {}
