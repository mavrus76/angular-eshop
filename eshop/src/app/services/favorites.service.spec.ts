import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let product = {
    id: 1,
    company: 'Google',
    title: 'Pixel 4 XL 6/128GB',
    price: 50400,
    image:
      'https://avatars.mds.yandex.net/get-mpic/1545401/img_id3166910857140137379.jpeg/9hq',
    rating: 5,
    category: 'smartphone',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesService],
    });
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get items in favorites', () => {
    let actualState: any;
    service.productsInFavorites$.subscribe(state => {
      actualState = state;
    });
    expect(actualState).toEqual([]);
  });

  it('should get volume items in favorites', () => {
    expectCount(0, service);
  });

  it('should add item to favorites', () => {
    service.addProduct(product);
    expectCount(1, service);
  });

  it('should remove item from favorites', () => {
    service.addProduct(product);
    service.removeProduct(product);
    expectCount(0, service);
  });
});

const expectCount = (count: any, service: FavoritesService): void => {
  let actualCount: any;
  service.productsCount$.subscribe(newCount => {
    actualCount = newCount;
  });
  expect(actualCount).toBe(count);
};
