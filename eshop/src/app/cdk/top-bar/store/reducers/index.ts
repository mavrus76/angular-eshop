/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/app/services/basket.service';
import { Product } from 'src/app/types/product-api.model';
import { BasketAction } from '../actions';

export interface State {
  products: Array<CartItem> | null;
  product: Product | null;
  total: number | null;
}

export const initialState: State = {
  products: null,
  product: null,
  total: null,
};

export const reducer = createReducer(
  initialState,
  on(BasketAction.enter, state => ({
    ...state,
  })),
  on(BasketAction.getSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
  on(BasketAction.getFailure, state => ({
    ...state,
  })),
  on(BasketAction.totalSuccess, (state, { total }) => ({
    ...state,
    total,
  })),
  on(BasketAction.totalFailure, state => ({
    ...state,
  }))
);
