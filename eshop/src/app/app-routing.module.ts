import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ExtraOptions,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    // redirectTo: 'catalog',
    component: HomepageComponent,
    data: { title: 'Магазин техники' },
  },
  {
    path: 'catalog',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./catalog/catalog.module').then(m => m.CatalogModule),
        data: { title: 'Каталог товаров' },
      },
      {
        path: 'product/:id',
        loadChildren: () =>
          import('./product/product.module').then(m => m.ProductModule),
      },
    ],
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./favorites/favorites.module').then(m => m.FavoritesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

export const options: ExtraOptions = {
  // enableTracing: true,
  scrollPositionRestoration: 'enabled',
  // preloadingStrategy: PreloadAllModules,
};

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, options)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
