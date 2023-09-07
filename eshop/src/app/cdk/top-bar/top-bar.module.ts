import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { ButtonModule } from 'src/app/cdk/button/button.module';
import { RouterModule } from '@angular/router';
import { SearchModule } from '../search/search.module';
import { CounterComponent } from './counter.component';
import { BasketComponent } from './basket.component';
import { DragModule } from '../directives/draganddrop/draganddrop.directive.module';
import { OnClickOutDirectiveModule } from '../directives/onClickOut/on-click-out.directive.module';
import * as fromState from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [TopBarComponent, CounterComponent, BasketComponent],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    SearchModule,
    DragModule,
    OnClickOutDirectiveModule,
    StoreModule.forFeature('basket', fromState.reducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  exports: [TopBarComponent, CounterComponent, BasketComponent],
})
export class TopBarModule {}
