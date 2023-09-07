import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  tap,
  toArray,
} from 'rxjs';
import productsMock from 'src/assets/product.data.json';
import { Product } from 'src/app/types/product-api.model';
import {
  ProductsResponse,
  ProductsService,
} from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  template: `
    <div class="search">
      <input type="text" placeholder="Поиск" id="search" #search />
      <ul class="search__list" *ngIf="searchResult$ | async as searchResult">
        <ng-container *ngIf="searchResult.length > 0; else notFound">
          <li
            class="search__item"
            *ngFor="let result of searchResult"
            (click)="onClick(result)">
            {{ result.title }}
          </li>
        </ng-container>
        <ng-template #notFound>
          <li class="search__item">Не найдено</li>
        </ng-template>
      </ul>
    </div>
  `,
  styles: [
    `
      .search {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px 0;
      }
      #search {
        border: 1px solid #dadada;
        border-radius: 20px;
        padding: 0 20px;
        max-width: 500px;
        width: 100%;
        height: 40px;
        transition: 0.3s ease-in;
      }
      .search__list {
        position: absolute;
        top: 70px;
        z-index: 13;
        border-radius: 5px;
        max-width: 500px;
        width: 100%;
        padding: 5px 0;
        list-style: none;
        background-color: #d2d2d2;
      }
      .search__item {
        padding: 5px 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
          opacity: 0.5;
        }
      }
    `,
  ],
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  public searchResult$!: Observable<Array<any>>;

  public products: Array<any> = [];
  public products$: Observable<ProductsResponse> =
    this.productsService.getProducts$({});
  public searchProduct(searchTerm: string): Observable<Array<any>> {
    return from(this.products).pipe(
      filter(
        product =>
          product?.title?.toLocaleLowerCase().indexOf(searchTerm) !== -1
      ),
      toArray()
    );
  }
  onClick(product: Product) {
    this.router.navigateByUrl('/catalog/product/' + product.id);
    const search = document.querySelector('#search');
    (search as HTMLInputElement).value = '';
    // TODO: this.searchResult$ = new Observable<Array<any>>();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.products$.subscribe(response => (this.products = response.items));
    const search = document.querySelector('#search');
    this.searchResult$ = fromEvent(search as HTMLInputElement, 'input').pipe(
      map(event => (event.target as HTMLInputElement).value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) =>
        this.searchProduct(searchTerm.toLowerCase())
      ),
      tap(value => console.log(value))
    );
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {}
}
