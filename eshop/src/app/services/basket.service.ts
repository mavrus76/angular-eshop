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
import { StorageService } from './storage.service';

export interface CartItem {
  product: Product;
  qty: number;
}

export interface CartState {
  items: Array<CartItem>;
}
@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private _state: CartState = {
    items: [...this.storageService.getDataCart()] as Array<CartItem>,
  };

  public state$: BehaviorSubject<CartState> = new BehaviorSubject(this._state);

  public productsInCart$: Observable<Array<CartItem>> = this.state$.pipe(
    map((state: CartState) => state.items)
  );

  public productsCount$: Observable<number> = this.state$.pipe(
    map((state: CartState) => state.items.length)
  );

  public total$: Observable<number> = this.productsInCart$.pipe(
    map((items: Array<CartItem>) => items.map(item => item.qty)),
    map((items: Array<number>) =>
      items.reduce((acc, curr) => {
        acc = acc + curr;
        return acc;
      }, 0)
    )
  );

  public amount$: Observable<number> = this.productsInCart$.pipe(
    map((items: Array<CartItem>) =>
      items.map(item => item.product.price! * item.qty)
    ),
    map((items: Array<number>) =>
      items.reduce((acc, curr) => {
        acc = acc + curr;
        return acc;
      }, 0)
    )
  );

  public addProduct(product: Product): void {
    if (this.isInCart(product.id!)) {
      this.changeQty(product, 1);
    } else {
      this.createProduct(product);
    }
  }

  public removeProduct(product: Product): void {
    if (this.isInCart(product.id!)) {
      this.changeQty(product, -1);
      this.removeZeroQty();
      this.updateState();
    }
  }

  public deleteProduct(product: Product, value: number): void {
    if (this.isInCart(product.id!)) {
      this.changeQty(product, -value);
      this.removeZeroQty();
      this.updateState();
    }
  }

  public clearCart(): void {
    this._state = {
      ...this._state,
      items: [],
    };
    localStorage.removeItem('dataCart');
    this.updateState();
  }

  public getProductQty(product: Product): Observable<number> {
    return this.productsInCart$.pipe(
      switchMap((items: Array<CartItem>) => from(items)),
      filter((item: CartItem) => item.product.id === product.id),
      map((item: CartItem) => item.qty)
    );
  }

  private removeZeroQty() {
    this._state = {
      ...this._state,
      items: [...this._state.items.filter((item: CartItem) => item.qty !== 0)],
    };
    this.updateState();
  }

  protected changeQty(product: Product, value: number): void {
    this._state = {
      ...this._state,
      items: [
        ...this._state.items.map((item: CartItem) => {
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

  protected isInCart(productId: number): boolean {
    return this._state.items.some(
      (item: CartItem) => item.product.id === productId
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

  constructor(private storageService: StorageService) {}
}
