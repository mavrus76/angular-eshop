import { Injectable } from '@angular/core';
import { LogService } from '../services/log.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public saveToStorage(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  public getFromStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  public clearStorage(): void {
    localStorage.clear();
  }

  public getProducts(productsData: any) {
    const fromStorage = this.getFromStorage('products');
    if (fromStorage) {
      this.logService.log('fromStorage');
      return JSON.parse(fromStorage);
    } else {
      const products = productsData;
      this.saveToStorage('products', JSON.stringify(products));
      this.logService.log('fromServer');
      return products;
    }
  }

  public putDataForm(checkoutForm: any) {
    const dataForm = checkoutForm;
    this.saveToStorage('dataForm', JSON.stringify(dataForm));
    return dataForm;
  }

  public getDataForm() {
    const fromStorage = this.getFromStorage('dataForm');
    if (fromStorage) {
      return JSON.parse(fromStorage);
    }
  }

  public putDataCart(item: any) {
    const dataCart = item;
    this.saveToStorage('dataCart', JSON.stringify(dataCart));
    return dataCart;
  }

  public getDataCart() {
    const fromStorage = this.getFromStorage('dataCart');
    if (fromStorage) {
      return JSON.parse(fromStorage);
    }
  }

  constructor(private logService: LogService) {}
}
