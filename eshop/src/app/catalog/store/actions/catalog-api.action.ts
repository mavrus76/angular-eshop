import { createAction, props } from '@ngrx/store';
import { ProductsResponse } from 'src/app/services/products.service';
import { Product } from 'src/app/types/product-api.model';

export const loadSuccess = createAction(
  '[Catalog Api] Load Products Success',
  props<{ products: ProductsResponse }>()
);

export const loadFailure = createAction(
  '[Catalog Api] Load Products Failure',
  props<{ error: any }>()
);

export const getSuccess = createAction(
  '[Catalog Api] Get Product Success',
  props<{ product: Product }>()
);

export const getFailure = createAction(
  '[Catalog Api] Get Product Failure',
  props<{ error: any }>()
);

export const deleteSuccess = createAction(
  '[Catalog Api] Delete Product Success',
  props<{ product: Product }>()
);

export const deleteFailure = createAction(
  '[Catalog Api] Delete Product Failure',
  props<{ error: any }>()
);
