import { Product, Category, Testimonial, CategoryWithSubcategories } from '@/types';

// Helper functions for filtering products
export const getProductBySlug = (products: Product[], slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (products: Product[], category: string): Product[] => {
  return products.filter((product) => product.category.name === category);
};

export const getFeaturedProducts = (products: Product[]): Product[] => {
  return products.filter((product) => product.featured);
};

export const getNewArrivals = (products: Product[]): Product[] => {
  return products.filter((product) => product.newArrival);
};

export const getRelatedProducts = (products: Product[], productId: string): Product[] => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  return products
    .filter((p) => p.category.id === product.category.id && p.id !== productId)
    .slice(0, 4);
};

export const getCategoryBySlug = (categories: CategoryWithSubcategories[], slug: string): CategoryWithSubcategories | undefined => {
  return categories.find((cat) => cat.slug === slug);
};
