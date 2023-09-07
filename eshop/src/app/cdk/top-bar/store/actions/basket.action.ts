import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/services/basket.service';
import { Product } from 'src/app/types/product-api.model';

export const enter = createAction('[Basket] Enter');

export const getSuccess = createAction(
  '[Basket] Get Products Success',
  props<{ products: Array<CartItem> }>()
);
export const getFailure = createAction(
  '[Basket] Get Products Failure',
  props<{ error: any }>()
);

export const totalSuccess = createAction(
  '[Basket] Total Products Success',
  props<{ total: number }>()
);
export const totalFailure = createAction(
  '[Basket] Total Products Failure',
  props<{ error: any }>()
);
