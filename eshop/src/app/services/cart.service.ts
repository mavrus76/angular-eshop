import { Injectable } from '@angular/core';
import { Product } from 'src/app/types/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public inCart: Array<any> = [];

  addProduct(product: Product) {
    const qty = this.inCart.filter(x => x === product).length ?? 0;
    if (qty === 0) {
      this.inCart.push({ qty: 1, product: product });
    } else {
      const p = this.inCart.find(x => x === product);
      p.qty = p.qty + 1;
    }

    this.inCart = [...this.inCart];
  }
  removeProduct(id: number) {
    const index = this.inCart.findIndex(x => x === id);
    if (index !== -1) {
      this.inCart.splice(index, 1);
    }

    this.inCart = [...this.inCart];
  }
  getCart() {
    return this.inCart;
  }
  getCount() {
    return this.inCart.length;
  }

  constructor() {}
}
