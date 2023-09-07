import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProductPrice } from 'src/app/types/product.model';

@Component({
  selector: 'app-price',
  template: `
    <div
      class="price__discount"
      [ngClass]="{ 'price__discount--hidden': !price.discount }">
      <div class="price__prev">
        {{ price.value | currency: 'RUB':'symbol-narrow':'1.0-0' }}
      </div>
      <div class="price__discount-badge">-{{ discount }}%</div>
    </div>
    <div class="price">
      {{ newPrice | currency: 'RUB':'symbol-narrow':'1.0-0' }}
    </div>
  `,
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit, OnChanges {
  @Input() price!: ProductPrice;
  newPrice?: number;
  ngOnChanges() {
    if (this.price) {
      this.newPrice = this.price.discount
        ? this.price.value! * (1 - this.price.discount)
        : this.price.value;
    }
  }
  constructor() {}

  ngOnInit(): void {}

  get discount(): number {
    return this.price.discount! * 100;
  }
}
