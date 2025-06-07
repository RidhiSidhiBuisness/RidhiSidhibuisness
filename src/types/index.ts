export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export type PageType = 'home' | 'new-arrivals' | 'ethnic' | 'western' | 'party' | 'cart' | 'wishlist';