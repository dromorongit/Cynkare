export interface Product {
  id: string;
  name: string;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  subcategory?: {
    id: string;
    name: string;
    slug: string;
  };
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription?: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  onSale?: boolean;
  rating?: number;
  reviewCount?: number;
  concerns?: string[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryWithSubcategories extends Category {
  subcategories: Subcategory[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
}

export type SortOption = 'newest' | 'price_low' | 'price_high';
