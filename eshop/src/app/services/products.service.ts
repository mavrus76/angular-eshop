import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Product } from 'src/app/types/product-api.model';
import { environment } from 'src/environments/environment';
import { cachedRequest } from '../cache/cache-decorator';
import { CacheService } from '../cache/cache.service';

export interface ProductsResponse {
  meta: { [key: string]: number };
  items: Array<Product>;
}

@Injectable()
export class ProductsService {
  public url = `${environment.api}/products`;

  @cachedRequest(function () {
    return this.cache;
  })
  public getProducts$(queryParams: {
    [key: string]: string;
  }): Observable<ProductsResponse> {
    const params = new HttpParams({ fromObject: queryParams });
    // console.log(params.toString());
    return this.http.get<ProductsResponse>(this.url, {
      params,
    });
  }

  public getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url, {});
  }
  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`, {});
  }
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }
  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete(`${this.url}/${id}`);
  }
  public updateProduct(product: Product): Observable<Product> {
    return this.http.put(this.url, product);
  }
  public patchProduct(product: Partial<Product>): Observable<Product> {
    return this.http.patch(this.url, product);
  }

  // public getProducts$<T>(
  //   query: { [key: string]: string } = {},
  // ): Observable<Array<Product>> {
  //   const params = new HttpParams({ fromObject: query });
  //   const headers = new HttpHeaders().set('Cache-Control', 'public');
  //   return this.http.get<Array<Product>>(`${environment.api}/products`, {
  //     headers,
  //     params,
  //   });
  // }

  constructor(
    private http: HttpService,
    // @Inject('BASE_URL') private readonly baseUrl: string,
    private readonly cache: CacheService
  ) {}
}
