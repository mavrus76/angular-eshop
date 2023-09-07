import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  template: `
    <div
      drag
      class="drag2"
      (onDataDrag)="onDrag($event)"
      class="cart"
      (onClickOut)="clickOut()">
      <div>
        <!-- <span class="material-icons app-icon">shopping_cart</span> -->
        <!-- <app-button text="Корзина" color="primary" i18n></app-button>
    <span class="counter">0</span> -->
      </div>

      <div class="cart__btn">
        <div class="cart__badge">{{ cartService.getCount() }}</div>
        <app-button
          text="Корзина"
          color="primary"
          (click)="open()"></app-button>
      </div>

      <div *ngIf="opened" class="cart__preview">
        <div class="cart__header">
          <div>
            Корзина, {{ cartService.getCount() }} товара,
            {{ amount | currency: 'RUB':'symbol-narrow' }}
          </div>
          <div style="margin-left: auto; cursor: pointer">
            <span (click)="open()" class="material-icons app-icon">
              close
            </span>
          </div>
        </div>
        <div class="cart__data">
          <div *ngFor="let item of cartService.inCart" class="cart__data-item">
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
                    item.product.price.value *
                      (1 - item.product.price.discount) *
                      item.qty | currency: 'RUB':'symbol-narrow':'1.0-0'
                  }}
                </div>
              </div>
            </div>
            <div class="cart__item-delete" (click)="remove(item)">
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
})
export class CartComponent implements OnInit, OnChanges {
  @Input() inCart: Array<any> = [];
  opened = false;
  @Output() removeProduct = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();
  @Output() addProductDrag = new EventEmitter<any>();
  amount = 0;
  constructor(public cartService: CartService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { inCart } = changes;
    if (inCart && inCart.currentValue && inCart.currentValue.length > 0) {
      this.amount = inCart.currentValue
        .map(
          (x: any) =>
            x.product.price.value * (1 - x.product.price.discount) * x.qty
        )
        .reduce((previous: any, current: any) => {
          return previous + current;
        });
    } else {
      this.amount = 0;
    }
  }

  open() {
    this.opened = !this.opened;
  }

  remove(item: any) {
    this.removeProduct.emit(item);
  }

  clearAll() {
    this.clear.emit();
    this.opened = false;
  }

  order() {
    this.clearAll();
    this.opened = false;
  }

  clickOut() {
    this.opened = false;
  }

  onDrag($event: any) {
    console.log($event);
    this.addProductDrag.emit($event);
  }
}
