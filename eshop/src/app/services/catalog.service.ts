import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class CatalogService {
  public filteredProducts = [];

  getProducts(item: any, updateRoute: boolean) {
    if (item.value === 0) {
      return (this.filteredProducts = this.service.getData());
    }
    if (item.value === 1) {
      return (this.filteredProducts = this.service
        .getData()
        .filter((x: any) => x.deliveryOptions.available));
    }
    if (item.value === 2) {
      return (this.filteredProducts = this.service
        .getData()
        .filter((x: any) => x.price.discount));
    }
    if (updateRoute) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { filter: item.value },
      });
    }
  }

  getProduct(id: number) {
    let product;
    return (product = this.service.getData().find((x: any) => x.id === id));
  }

  constructor(
    public service: DataService<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
