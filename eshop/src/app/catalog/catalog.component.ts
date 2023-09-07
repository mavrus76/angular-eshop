import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toggle } from '../cdk/toggle/toggle.component';
import { BasketService } from '../services/basket.service';
import { CartService } from '../services/cart.service';
import { CatalogService } from '../services/catalog.service';
import { DataService } from '../services/data.service';
import { FavoritesService } from '../services/favorites.service';
import {
  ProductsResponse,
  ProductsService,
} from '../services/products.service';
import { StorageService } from '../services/storage.service';
import { Product } from '../types/product-api.model';
import { CardComponent } from './components/card/card.component';
import * as fromCatalog from './store/reducers';
import { ProductSelectors } from './store/selectors';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(CardComponent) public catalogCards!: QueryList<CardComponent>;

  public productsInCart = this.basketService.productsInCart$;
  public addToCart(product: Product): void {
    this.basketService.addProduct(product);
  }
  public removeFromCart(product: Product): void {
    this.basketService.removeProduct(product);
  }

  public productsInFavorites = this.favoritesService.productsInFavorites$;
  public addToFavorites(product: Product): void {
    this.favoritesService.addProduct(product);
  }
  public removeFromFavorites(product: Product): void {
    this.favoritesService.removeProduct(product);
  }

  public title: string;

  public products$: Observable<ProductsResponse | null> = this.store.select(
    ProductSelectors.selectProducts
  );

  public productsData: Array<Product> = [];
  public itemsPerPage!: number;
  public totalItems!: number;

  buttons: Toggle[] = [
    { label: 'Показать все', value: 0 },
    { label: 'В наличии', value: 1 },
    { label: 'Со скидкой', value: 2 },
  ];
  selectedButton!: Toggle;

  clearCart() {
    this.cartService.inCart = [];
  }

  addProductDrag($event: any) {
    this.cartService.addProduct($event);
  }

  public productsCache$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // public destroy$: Subject<any> = new Subject<any>();

  public createPagesArray(pagesCount: number): Array<any> {
    return [...new Array(pagesCount)];
  }
  public applyQuery(param: { [key: string]: string }): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: param,
      queryParamsHandling: 'merge',
    });
  }

  public getProducts(params: { [key: string]: string }) {
    const queryParams = {
      ...params,
      page: params['page'] ? params['page'] : '1',
    };
    this.products$ = this.productsService.getProducts$(queryParams);
  }

  public addProducts() {
    let products = this.storageService.getProducts(this.productsData);
    return (this.productsData = [
      ...this.productsData,
      ...this.getResidue(
        this.productsData,
        products,
        this.totalItems,
        this.itemsPerPage
      ),
    ]);
  }

  public getResidue(
    data: any[],
    arr: any[],
    total: number,
    range: number
  ): any[] {
    let residue = total % range;
    if (data.length + range < total) {
      return arr;
    } else {
      return arr.slice(0, residue);
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dataService: DataService<any>,
    public catalogService: CatalogService,
    private productsService: ProductsService,
    public cartService: CartService,
    public storageService: StorageService,
    private cdr: ChangeDetectorRef,
    protected favoritesService: FavoritesService,
    // eslint-disable-next-line @ngrx/no-typed-global-store
    private store: Store<fromCatalog.State>,
    protected basketService: BasketService
  ) {
    this.title = this.route.snapshot.data['title'];
  }

  ngOnInit(): void {
    this.applyQuery({ page: '1' });
    this.route.queryParams.subscribe(params => this.getProducts(params));

    this.productsCache$.next(this.products$);
    this.productsCache$.subscribe(response =>
      response.subscribe(
        (data: { items: Product[] }) => (this.productsData = data.items)
      )
    );
    this.productsCache$.subscribe(response =>
      response.subscribe(
        (data: any) => (this.itemsPerPage = data.meta['itemsPerPage'])
      )
    );
    this.productsCache$.subscribe(response =>
      response.subscribe(
        (data: any) => (this.totalItems = data.meta['totalItems'])
      )
    );
  }

  ngAfterViewInit(): void {
    this.catalogCards.map((cardComponent: CardComponent) => {
      cardComponent.quantity = this.basketService.getProductQty(
        cardComponent?.product
      );
    });
  }

  ngOnDestroy(): void {
    this.productsCache$.complete();
  }
}
