import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Product } from '../../types/product.model';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-card',
  template: `
    <div draggable="true" drag [data]="product" class="card">
      <div class="card__inner">
        <app-badge class="card__badge" [badge]="product.badge"></app-badge>
        <figure class="card__gallery">
          <img class="card__gallery-image" (click)="open()" [src]="image" />
        </figure>
        <div class="card__color-options">
          <app-color-option
            [color]="product.colors.one.color!"
            (click)="changeImage(product.colors.one.image!)">
          </app-color-option>
          <app-color-option
            [color]="product.colors.two.color!"
            (click)="changeImage(product.colors.two.image!)">
          </app-color-option>
        </div>
        <div class="card__company">{{ product.company }}</div>
        <div class="card__title" i18n>{{ product.title }}</div>

        <div class="card__rates">
          <app-rates
            [productId]="product.id"
            [rating]="product.rating?.value"></app-rates>
          <span class="card__reviews"
            >{{ product.rating?.reviews }} отзыва</span
          >
        </div>
        <app-price [price]="product.price!"></app-price>

        <div class="card__actions">
          <app-button
            [text]="'Добавить в корзину'"
            [buttonType]="'stroked'"
            (click)="onClick()">
          </app-button>
          <app-button-icon
            [active]="isFavorite"
            (click)="toggleFavorite()"></app-button-icon>
        </div>
        <app-delivery-options
          [options]="product.deliveryOptions!"></app-delivery-options>
      </div>
    </div>
  `,
  styles: [
    `
      @import '../mixins/mixins.scss';
      @import '../theme/colors.scss';
      @include theme-button($app-colors);
      $primary: map-get($app-colors, primary);
      $accent: map-get($app-colors, accent);
      $success: map-get($app-colors, success);
      $warning: map-get($app-colors, warning);
      $foreground: map-get($app-colors, foreground);

      .card {
        position: relative;
        border: 1px solid #e3e5e5;
        border-radius: 10px;
        max-width: 300px;
        min-height: 598px;
        padding: 23px 23px 47px;
        transition: all 0.3s ease;
        ::ng-deep {
          app-button > button {
            width: 100%;
          }
        }
      }
      .card:hover {
        box-shadow: 0 0 10px 5px rgba(221, 221, 221, 1);
      }
      .card__inner {
        position: relative;
        width: 100%;
      }
      .card__rates {
        display: flex;
        align-items: center;
        padding: 0 0 4px;
      }
      .card__reviews {
        display: inline-block;
        margin-left: 8px;
        font: 500 12px/16px Inter, sans-serif;
        color: #999;
      }
      .card__gallery {
        width: 100%;
        margin: 0 auto;
      }
      .card__gallery-image {
        width: 100%;
        min-height: 250px;
      }
      .card__color-options {
        display: flex;
        margin: 8px 0;
        padding: 4px 0;
      }
      .card__badge {
        position: absolute;
        left: 0;
        top: 0;
      }
      .card__title {
        margin-bottom: 2px;
        font: 600 16px/24px Inter, sans-serif;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .card__actions {
        display: flex;
        margin: 16px -4px;
      }
      .card__actions > * {
        margin: 0 4px;
      }

      app-color-option {
        padding: 0 2px;
      }
    `,
  ],
})
export class CardComponent implements OnInit, OnChanges {
  @Input() product!: Product;
  isFavorite = false;
  image?: string;
  @Output() addProduct = new EventEmitter<any>();
  quantity: any;

  ngOnChanges() {
    if (this.product) {
      this.isFavorite = false;
      this.image = this.product.image;
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleFavorite() {
    this.addProduct.emit(this.product);
    this.isFavorite = !this.isFavorite;
  }

  changeImage(image: string): void {
    this.image = image;
  }

  onClick() {
    if (this.product.deliveryOptions?.available) {
      this.addProduct.emit(this.product);
      // this.product.deliveryOptions?.available - 1;
    }
  }

  open() {
    this.router.navigateByUrl('/catalog/product/' + this.product.id);
  }
}
