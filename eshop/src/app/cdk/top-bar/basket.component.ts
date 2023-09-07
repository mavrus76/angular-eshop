/* eslint-disable @ngrx/no-typed-global-store */
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
  DoCheck,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BasketService, CartItem } from 'src/app/services/basket.service';
import { StorageService } from 'src/app/services/storage.service';
import { Product } from 'src/app/types/product-api.model';
import { BasketAction } from './store/actions';
import * as fromBasket from './store/reducers';
import { ProductSelectors } from './store/selectors';

@Component({
  selector: 'app-basket',
  template: `
    <div
      drag
      class="drag2"
      (onDataDrag)="onDrag($event)"
      class="cart"
      (window:unload)="productsToStorage(this.productsInCart)">
      <div class="cart__btn">
        <app-flat-button
          icon="shopping_cart"
          [badge]="total"
          (click)="open()"></app-flat-button>
      </div>

      <div *ngIf="opened" class="cart__preview">
        <div class="cart__header">
          <div>
            Корзина, {{ total }} товара,
            {{ totalAmount | async | currency: 'RUB':'symbol-narrow' }}
          </div>
          <div style="margin-left: auto; cursor: pointer">
            <span (click)="open()" class="material-icons app-icon">
              close
            </span>
          </div>
        </div>
        <div class="cart__data">
          <div *ngFor="let item of productsInCart" class="cart__data-item">
            <div class="cart__data-content">
              <div class="cart__image-wrapper">
                <img
                  class="cart__image"
                  width="120"
                  [src]="item.product.image" />
              </div>
              <div class="cart__data-text">
                <div>{{ item.product.company }}</div>
                <div>{{ item.product.title }}</div>
                <div>
                  {{ item.qty }} товара
                  {{
                    item.product.price! * item.qty
                      | currency: 'RUB':'symbol-narrow':'1.0-0'
                  }}
                </div>
                <app-counter
                  [value]="item.qty"
                  (valueIncrease)="addToCart(item.product)"
                  (valueDecrease)="removeFromCart(item.product)"></app-counter>
              </div>
            </div>
            <div
              class="cart__item-delete"
              (click)="deleteProduct(item.product, item.qty)">
              <span class="material-icons"> delete </span>
            </div>
          </div>
        </div>
        <div class="cart__actions">
          <app-button
            color="primary"
            text="Оформить заказ"
            (click)="order()"></app-button>
          <app-button (click)="clearAll()" text="Очистить корзину"></app-button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .cart {
        position: relative;
        display: flex;
        align-items: center;

        &__btn {
          position: relative;
        }

        &__badge {
          position: absolute;
          right: 0;
          top: -12px;
          z-index: 1;
          border-radius: 45px;
          width: 24px;
          padding: 4px;
          font-size: 12px;
          background-color: #ff4081;
          color: whitesmoke;
          text-align: center;
        }

        &__header {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #dddddd;
          padding: 16px;
        }

        &__data {
          padding: 16px;
          background-color: white;
        }

        &__data-item {
          position: relative;
          margin-bottom: 16px;
        }

        &__data-content {
          display: flex;
        }

        &__image-wrapper {
          width: 40%;
        }

        &__image {
          width: 100%;
          max-height: 150px;
          object-fit: contain;
        }

        &__data-text {
          margin-left: 16px;
          line-height: 1.8;
        }

        &__item-delete {
          position: absolute;
          bottom: 0;
          right: 0;
          cursor: pointer;
        }

        &__actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
          padding-left: 16px;
          padding-right: 16px;
        }

        &__preview {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 113;
          margin-top: 48px;
          border: 1px solid #dddddd;
          border-radius: 16px;
          min-width: 380px;
          padding-bottom: 16px;
          background-color: whitesmoke;
        }
      }

      .app-icon {
        color: grey;
        margin-right: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent
  implements OnInit, AfterViewInit, DoCheck, OnDestroy
{
  public total!: number | null;
  public opened = false;
  @Output() addProductDrag: EventEmitter<any> = new EventEmitter<any>();

  public qtySubscribe!: Subscription;
  public subscriptionProductsInCart!: Subscription;

  public totalAmount = this.basketService.amount$;

  public productsInCart!: Array<CartItem> | null;
  public productsToStorage(data: any) {
    this.storageService.putDataCart(data);
  }

  public deleteProduct(product: Product, value: number): void {
    this.basketService.deleteProduct(product, value);
  }

  public totalQty$: Observable<number | null> = this.store.select(
    ProductSelectors.selectTotal
  );

  public addToCart(product: Product): void {
    this.basketService.addProduct(product);
  }
  public removeFromCart(product: Product): void {
    this.basketService.removeProduct(product);
  }

  constructor(
    protected basketService: BasketService,
    private storageService: StorageService,
    private store: Store<fromBasket.State>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.dispatch(BasketAction.enter());
    this.qtySubscribe = this.totalQty$.subscribe(value => (this.total = value));

    this.subscriptionProductsInCart = this.store
      .select(ProductSelectors.selectProducts)
      // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe(value => (this.productsInCart = value));
  }

  open() {
    this.opened = !this.opened;
  }

  clearAll() {
    this.basketService.clearCart();
    this.opened = false;
  }

  order() {
    console.log('order');
    this.clearAll();
    this.opened = false;
  }

  // (onClickOut)="clickOut()"
  // clickOut() {
  //   this.opened = false;
  // }

  onDrag($event: any) {
    console.log($event);
    this.addProductDrag.emit($event);
  }

  ngAfterViewInit(): void {}

  ngDoCheck(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.storageService.putDataCart(this.productsInCart);
    this.subscriptionProductsInCart.unsubscribe();
  }
}
