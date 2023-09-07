import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';

export const selectProductsState = createFeatureSelector<State>('basket');

export const selectProducts = createSelector(
  selectProductsState,
  state => state.products
);

export const selectTotal = createSelector(
  selectProductsState,
  state => state.total
);

export const selectProduct = createSelector(
  selectProductsState,
  state => state.product
);
