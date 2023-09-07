import { A11yModule } from '@angular/cdk/a11y';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ButtonModule } from './cdk/button/button.module';
import { CatalogModule } from './catalog/catalog.module';
import { NotFoundModule } from './not-found/not-found.module';
import { TopBarModule } from './cdk/top-bar/top-bar.module';
import { BreadcrumbsModule } from './cdk/breadcrumbs/breadcrumbs.module';
import { HomepageModule } from './homepage/homepage.module';
import { ProductModule } from './product/product.module';
import { DragModule } from './cdk/directives/draganddrop/draganddrop.directive.module';
import { DropdownModule } from './cdk/dropdown/dropdown.module';
import { InputModule } from './cdk/input/input.module';
import { CartModule } from './cdk/cart/cart.module';
import { DataService } from './services/data.service';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchModule } from './cdk/search/search.module';
import { FilterPipe } from './cdk/pipes/filter.pipe';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './store/reducers/user.reducer';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent, FilterPipe],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    A11yModule,
    BrowserAnimationsModule,
    TopBarModule,
    BreadcrumbsModule,
    ButtonModule,
    HomepageModule,
    CatalogModule,
    ProductModule,
    NotFoundModule,
    DragModule,
    DropdownModule,
    InputModule,
    CartModule,
    HttpClientModule,
    SearchModule,
    StoreModule.forRoot({ user: fromUser.reducer }, {}),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    DataService,
    CartService,
    { provide: LOCALE_ID, useValue: 'ru-Ru' },
    // { provide: 'BASE_URL', useFactory: () => environment.api, deps: [] },
    // { provide: 'token', useFactory: () => environment.api, deps: [] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
