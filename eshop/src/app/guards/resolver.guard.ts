import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import products from '../../assets/product.data.json';

@Injectable({
  providedIn: 'root',
})
export class ResolverGuard implements Resolve<any> {
  public products = products.items;
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    const productId = Number(route.params['id']);
    return this.products.filter((p) => p.id === productId)[0];
  }
}
