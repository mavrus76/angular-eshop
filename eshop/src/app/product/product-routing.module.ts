import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ResolverGuard } from '../guards/resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    // resolve: {
    //   product: ResolverGuard,
    // },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
