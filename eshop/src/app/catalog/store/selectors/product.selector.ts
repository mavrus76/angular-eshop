import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';

export const selectProductsState = createFeatureSelector<State>('catalog');

export const selectProducts = createSelector(
  selectProductsState,
  state => state.products
);

export const selectProduct = createSelector(
  selectProductsState,
  state => state.product
);

export const selectLoading = createSelector(
  selectProductsState,
  state => state.loading
);
