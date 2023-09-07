import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BasketService, CartItem } from 'src/app/services/basket.service';
import { BasketAction } from '../actions';

@Injectable()
export class ProductsEffects {
  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BasketAction.enter),
      switchMap(_ =>
        this.basketService.productsInCart$.pipe(
          map((products: Array<CartItem>) =>
            BasketAction.getSuccess({ products })
          ),
          catchError(error => of(BasketAction.getFailure({ error })))
        )
      )
    );
  });

  getTotal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BasketAction.enter),
      switchMap(_ =>
        this.basketService.total$.pipe(
          map((total: number) => BasketAction.totalSuccess({ total })),
          catchError(error => of(BasketAction.getFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private basketService: BasketService
  ) {}
}
