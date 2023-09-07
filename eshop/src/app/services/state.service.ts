import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Connectable,
  ConnectableObservable,
  map,
  Observable,
  share,
} from 'rxjs';
import { Product } from '../types/product.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public products$: Connectable<Array<Product>> = this.http
    .get<any>('/assets/product.data.json')
    .pipe(
      map(products => products.items),
      share()
    ) as Connectable<Array<Product>>;

  public qty$: Observable<number> = this.products$.pipe(
    map(products => products.length)
  );

  constructor(private http: HttpClient) {}
}
