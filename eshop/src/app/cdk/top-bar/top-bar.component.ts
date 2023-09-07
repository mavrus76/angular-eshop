import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { User } from 'src/app/store/reducers/user.reducer';
import { UserSelector } from 'src/app/store/selectors';
import * as fromApp from './../../store/reducers';

@Component({
  selector: 'app-top-bar',
  template: `
    <header class="top-bar">
      <div class="container-bar">
        <h1 class="title">eShop</h1>
        <ul class="top-menu">
          <li>
            <a
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              >Главная</a
            >
          </li>
          <li>
            <a routerLink="/catalog" routerLinkActive="active">Каталог</a>
          </li>
          <li>
            <a routerLink="/order" routerLinkActive="active">Формы</a>
          </li>
        </ul>

        <div class="top-bar__spacer">
          <app-search></app-search>
        </div>
        <div class="top-bar__buttons">
          <app-flat-button
            routerLink="/favorites"
            routerLinkActive="active"
            text="Избранное"
            icon="favorite_border"
            [badge]="totalFavorites"></app-flat-button>
          <app-basket (addProductDrag)="addProductDrag($event)"></app-basket>
        </div>
        <div
          class="d-flex flex-column justify-content-center align-items-center position-relative">
          <span
            class="material-icons md-36 user-pic"
            (click)="profileDropdownOpen = !profileDropdownOpen">
            account_circle
          </span>
          <ng-container *ngIf="profileDropdownOpen">
            <div class="user-info" *ngIf="user$ | async as user">
              <h3 class="login" routerLink="/auth" routerLinkActive="active">
                Войти
              </h3>
              <h4>{{ user.firstName }} {{ user.lastName }}</h4>
              <span>{{ user.email }}</span>
            </div>
          </ng-container>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .top-bar {
        display: flex;
        align-items: center;
        height: 100px;
        background-color: #3f51b5;
      }
      .container-bar {
        display: flex;
        align-items: center;
        margin: 0 auto;
        /* max-width: 1024px; */
        width: 100%;
        padding: 0 50px;
      }
      .title,
      .top-menu li a {
        color: #fff;
      }
      .title {
        margin-right: 50px;
        text-shadow: -1px 1px 0 #41ba45, 1px 1px 0 #c63d2b, 1px -1px 0 #42afac,
          -1px -1px 0 #c6c23f;
      }
      .top-menu {
        display: flex;
        align-items: center;
      }
      .top-menu li a {
        margin-right: 25px;
        font-size: 20px;
        font-weight: 500;
        transition: 0.3s ease;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .top-bar__spacer {
        width: 100%;
      }
      .top-bar__buttons {
        display: flex;
        margin-right: 15px;
      }
      .container-bar a {
        align-self: center;
        font-size: 18px;
        font-weight: 500;
        white-space: nowrap;
        transition: 0.3s ease;
      }
      .container-bar a:hover,
      .user-pic:hover,
      .top-menu li a:hover {
        color: #bbb;
      }
      .top-menu li a.active {
        color: #ff4081;
      }
      app-flat-button.active {
        margin: -2px;
        border: 2px solid #ff4081;
        border-radius: 10px;
      }
      .user-pic {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        cursor: pointer;
      }
      .user-info {
        position: absolute;
        top: 40px;
        right: 0;
        z-index: 11;
        border-radius: 8px;
        padding: 30px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      }
      .login {
        cursor: pointer;
      }
    `,
  ],
})
export class TopBarComponent implements OnInit, OnDestroy {
  public profileDropdownOpen = false;
  public totalFavorites!: number;
  public totalSubscribe!: Subscription;

  public user$: Observable<User> = this.store.select(
    UserSelector.selectUserState
  );

  addProductDrag($event: any) {
    this.basketService.addProduct($event);
  }

  constructor(
    private router: Router,
    private favoritesService: FavoritesService,
    protected basketService: BasketService,
    // eslint-disable-next-line @ngrx/no-typed-global-store
    private store: Store<fromApp.AppState>
  ) {
    this.totalSubscribe = favoritesService.productsCount$.subscribe(
      value => (this.totalFavorites = value)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
