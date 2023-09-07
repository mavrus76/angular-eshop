import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  from,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { Product } from '../types/product-api.model';

export interface FavoriteItem {
  product: Product;
  qty: number;
}

export interface FavoriteState {
  items: Array<FavoriteItem>;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private _state: FavoriteState = {
    items: [] as Array<FavoriteItem>,
  };

  public state$: BehaviorSubject<FavoriteState> = new BehaviorSubject(
    this._state
  );

  public productsInFavorites$: Observable<Array<FavoriteItem>> =
    this.state$.pipe(map((state: FavoriteState) => state.items));

  public productsCount$: Observable<number> = this.state$.pipe(
    map((state: FavoriteState) => state.items.length)
  );

  public addProduct(product: Product): void {
    if (this.isInFavorites(product.id!)) {
      return;
    } else {
      this.createProduct(product);
    }
  }

  public removeProduct(product: Product): void {
    if (this.isInFavorites(product.id!)) {
      this.changeQty(product, -1);
      this.removeZeroQty();
      this.updateState();
    }
  }

  private removeZeroQty() {
    this._state = {
      ...this._state,
      items: [
        ...this._state.items.filter((item: FavoriteItem) => item.qty !== 0),
      ],
    };
    this.updateState();
  }

  protected changeQty(product: Product, value: number): void {
    this._state = {
      ...this._state,
      items: [
        ...this._state.items.map((item: FavoriteItem) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              qty: item.qty + value,
            };
          }
          return item;
        }),
      ],
    };
    this.updateState();
  }

  protected isInFavorites(productId: number): boolean {
    return this._state.items.some(
      (item: FavoriteItem) => item.product.id === productId
    );
  }

  protected updateState(): void {
    this.state$.next({ ...this._state });
  }

  protected createProduct(product: Product): void {
    this._state = {
      ...this._state,
      items: [...this._state.items, { product, qty: 1 }],
    };
    this.updateState();
  }

  constructor() {}
}
