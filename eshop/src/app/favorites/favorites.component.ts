import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CardComponent } from '../catalog/components/card/card.component';
import { BasketService } from '../services/basket.service';
import { FavoritesService } from '../services/favorites.service';
import { Product } from '../types/product-api.model';

@Component({
  selector: 'app-favorites',
  template: `
    <div>
      <h2>Избранное</h2>
      <div class="d-flex flex-wrap justify-content-around">
        <div *ngFor="let item of productsInFavorites | async">
          <app-card-api
            [product]="item.product"
            [isFavorite]="isFavorite"
            (addToCart)="addToCart($event)"
            (removeFromFavorites)="removeFromFavorites($event)"></app-card-api>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit, AfterViewInit {
  @ViewChildren(CardComponent) public catalogCards!: QueryList<CardComponent>;
  public isFavorite: boolean = true;
  public productsInFavorites = this.favoritesService.productsInFavorites$;

  public productsInCart = this.basketService.productsInCart$;
  public addToCart(product: Product): void {
    this.basketService.addProduct(product);
  }

  public removeFromFavorites(product: Product): void {
    this.favoritesService.removeProduct(product);
  }

  constructor(
    private favoritesService: FavoritesService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.catalogCards.map((cardComponent: CardComponent) => {
      cardComponent.isFavorite = this.isFavorite;
    });
  }
}
