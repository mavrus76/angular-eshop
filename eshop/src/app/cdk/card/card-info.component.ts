import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from 'src/app/types/product-api.model';

@Component({
  selector: 'app-card-info',
  template: `
    <div class="card">
      <div class="card__inner">
        <figure class="card__gallery">
          <img class="card__gallery-image" [src]="image" />
        </figure>
        <div class="card__company">{{ product.company }}</div>
        <div class="card__title">{{ product.title }}</div>
        <div class="card__category">{{ product.category }}</div>
        <div class="card__rate">Рейтинг: {{ product.rating }}</div>
        <div>
          {{ product.price | currency: 'RUB':'symbol-narrow':'1.0-0' }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        margin-bottom: 30px;
        border: 1px solid #e3e5e5;
        border-radius: 10px;
        max-width: 300px;
        min-height: 400px;
        padding: 23px;
        transition: all 0.3s ease;
        ::ng-deep {
          app-button > button {
            width: 100%;
          }
        }
      }
      .card__inner {
        width: 100%;
      }
      .card__category {
        font-style: italic;
      }
      .card__rate {
        padding: 5px 0;
        font: 500 12px/16px Inter, sans-serif;
        color: #999;
      }
      .card__gallery {
        width: 100%;
        margin: 0 auto;
      }
      .card__gallery-image {
        width: 100%;
        max-height: 250px;
        object-fit: contain;
        cursor: pointer;
      }
      .card__title {
        margin-bottom: 2px;
        font: 600 16px/24px Inter, sans-serif;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `,
  ],
})
export class CardInfoComponent implements OnInit, OnChanges {
  @Input() product!: Product;
  image?: string;

  ngOnChanges() {
    if (this.product) {
      this.image = this.product.image;
    }
  }

  constructor() {}

  ngOnInit(): void {}

  changeImage(image: string): void {
    this.image = image;
  }
}
