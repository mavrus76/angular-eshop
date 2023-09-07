export interface Product {
  id?: number;
  company?: string;
  title?: string;
  image?: string;
  rating?: ProductRating;
  reviews?: number;
  price?: ProductPrice;
  deliveryOptions?: DeliveryOptions;
  badge?: ProductBadge;
  colors: {
    one: ProductColor;
    two: ProductColor;
  };
}

export interface ProductPrice {
  value?: number;
  discount?: number;
  code?: string;
}

export interface ProductRating {
  value?: number;
  reviews?: number;
}

export interface DeliveryOptions {
  delivery?: string;
  postamate?: boolean;
  available?: number;
}

export interface ProductBadge {
  color?: string;
  text?: string;
}

export interface ProductColor {
  color?: string;
  image?: string;
}
