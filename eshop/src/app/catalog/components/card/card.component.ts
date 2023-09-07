import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Product } from '../../../types/product-api.model';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Observable } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-card-api',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, OnChanges {
  @Input() quantity!: Observable<number>;
  @Input() product!: Product;
  @Input() isFavorite: boolean = false;
  public image?: string;
  @Output() addProduct = new EventEmitter<any>();
  @Output() addToCart = new EventEmitter<any>();
  @Output() removeFromCart = new EventEmitter<any>();
  @Output() addToFavorites = new EventEmitter<any>();
  @Output() removeFromFavorites = new EventEmitter<any>();
  @Output() changeQuantity = new EventEmitter<any>();

  ngOnChanges() {
    if (this.product) {
      // this.isFavorite = false;
      this.image = this.product.image;
    }
  }

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {}

  toggleFavorite() {
    console.log('toggle favorite');
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.addToFavorites.emit(this.product);
    } else {
      this.removeFromFavorites.emit(this.product);
    }
  }

  changeImage(image: string): void {
    this.image = image;
  }

  onClick() {
    console.log('add to cart');
    this.addProduct.emit(this.product);
    this.addToCart.emit(this.product);
  }

  open() {
    console.log('open product info');
    this.router.navigateByUrl('/catalog/product/' + this.product.id);
  }
}
