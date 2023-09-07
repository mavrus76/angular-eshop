import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { findEl } from 'src/app/cdk/utils';
import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.product = product;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render rates', () => {
    const counter = findEl<CardComponent>(fixture, 'app-rates-api');
    expect(counter).toBeTruthy();
  });

  it('should render price', () => {
    const counter = findEl<CardComponent>(fixture, 'app-price-api');
    expect(counter).toBeTruthy();
  });

  it('should render add button', () => {
    const counter = findEl<CardComponent>(fixture, 'app-button');
    expect(counter).toBeTruthy();
  });

  it('should render favorite button', () => {
    const counter = findEl<CardComponent>(fixture, 'app-button-icon');
    expect(counter).toBeTruthy();
  });

  it('should have buttons', () => {
    const addButton = findEl<CardComponent>(fixture, 'app-button');
    const favoriteButton = findEl<CardComponent>(fixture, 'app-button-icon');
    expect(addButton).toBeTruthy();
    expect(favoriteButton).toBeTruthy();
  });

  it('calls for open card', () => {
    spyOn(console, 'log').and.callThrough();
    component.open();
    expect(console.log).toHaveBeenCalled();
  });

  it('calls for add to cart', () => {
    spyOn(console, 'log').and.callThrough();
    component.onClick();
    expect(console.log).toHaveBeenCalled();
  });

  it('calls for toggle favorite', () => {
    spyOn(console, 'log').and.callThrough();
    component.toggleFavorite();
    expect(console.log).toHaveBeenCalled();
  });

  it('listens for open card', () => {
    const button = findEl<CardComponent>(fixture, '[data-test="open-card"]');
    let open = component.open();
    spyOn(console, 'log');
    button.triggerEventHandler('click', open);
    expect(console.log).toHaveBeenCalledWith('open product info');
  });

  it('listens for add to cart', () => {
    const button = findEl<CardComponent>(fixture, 'app-button');
    let add = component.onClick();
    spyOn(console, 'log');
    button.triggerEventHandler('click', add);
    expect(console.log).toHaveBeenCalledWith('add to cart');
  });

  it('listens for toggle favorite', () => {
    const button = findEl<CardComponent>(fixture, 'app-button-icon');
    let toggle = component.toggleFavorite();
    spyOn(console, 'log');
    button.triggerEventHandler('click', toggle);
    expect(console.log).toHaveBeenCalledWith('toggle favorite');
  });
});
