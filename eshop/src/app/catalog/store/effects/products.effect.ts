import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  ProductsResponse,
  ProductsService,
} from 'src/app/services/products.service';
import { Product } from 'src/app/types/product-api.model';
import { CatalogApiAction, CatalogPageAction } from '../actions';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatalogPageAction.enter),
      switchMap(_ =>
        this.productsService.getProducts$({}).pipe(
          map((products: ProductsResponse) =>
            CatalogApiAction.loadSuccess({ products })
          ),
          catchError(error => of(CatalogApiAction.loadFailure({ error })))
        )
      )
    );
  });

  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatalogPageAction.enter),
      switchMap(_ =>
        this.productsService.getProduct(0).pipe(
          map((product: Product) => CatalogApiAction.getSuccess({ product })),
          catchError(error => of(CatalogApiAction.getFailure({ error })))
        )
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CatalogPageAction.enter),
      switchMap(_ =>
        this.productsService.deleteProduct(0).pipe(
          map((product: Product) =>
            CatalogApiAction.deleteSuccess({ product })
          ),
          catchError(error => of(CatalogApiAction.deleteFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
