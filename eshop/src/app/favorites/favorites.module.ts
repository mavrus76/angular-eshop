import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { CatalogModule } from '../catalog/catalog.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, FavoritesRoutingModule, CatalogModule],
  exports: [FavoritesComponent],
})
export class FavoritesModule {}
