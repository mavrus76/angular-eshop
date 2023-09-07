/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { ProductsResponse } from 'src/app/services/products.service';
import { Product } from 'src/app/types/product-api.model';
import { CatalogApiAction, CatalogPageAction } from '../actions';

export interface State {
  products: ProductsResponse | null;
  product: Product | null;
  loading: boolean;
}

export const initialState: State = {
  products: null,
  product: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(CatalogPageAction.enter, state => ({
    ...state,
    loading: true,
  })),
  on(CatalogApiAction.loadSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(CatalogApiAction.loadFailure, state => ({
    ...state,
    loading: false,
  })),
  on(CatalogApiAction.getSuccess, (state, { product }) => ({
    ...state,
    product,
    loading: false,
  })),
  on(CatalogApiAction.getFailure, state => ({
    ...state,
    loading: false,
  })),
  on(CatalogApiAction.deleteSuccess, (state, { product }) => ({
    ...state,
    product,
    loading: false,
  })),
  on(CatalogApiAction.deleteFailure, state => ({
    ...state,
    loading: false,
  }))
);
