'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { SortOption } from '@/types';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  onSale: boolean;
  rating?: number;
  reviewCount?: number;
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
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsRes = await fetch('/api/products');
      const productsData = await productsRes.json();
      setProducts(productsData);
      
      // Fetch categories
      const categoriesRes = await fetch('/api/categories');
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (p) => p.category.slug === selectedCategory
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    }

    return filtered;
  }, [products, selectedCategory, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="bg-secondary/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-hero font-heading text-text">Shop</h1>
            <p className="text-text/60 mt-2">Browse our premium collection</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-hero font-heading text-text"
          >
            Shop
          </motion.h1>
          <p className="text-text/60 mt-2">Browse our premium collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 text-text mb-6"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`md:w-64 ${
              showFilters ? 'block' : 'hidden'
            } md:block`}
          >
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-semibold text-text mb-4">
                Category
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`block w-full text-left px-3 py-2 transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-accent text-white'
                      : 'text-text/70 hover:bg-secondary'
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className={`block w-full text-left px-3 py-2 transition-colors ${
                      selectedCategory === category.slug
                        ? 'bg-accent text-white'
                        : 'text-text/70 hover:bg-secondary'
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-semibold text-text mb-4">
                Price Range
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-text/60">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 200) && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange([0, 200]);
                }}
                className="flex items-center gap-2 text-accent hover:text-text transition-colors"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sorting */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-text/60">
                {filteredProducts.length} products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-accent/30 px-4 py-2 text-text bg-primary focus:outline-none focus:border-accent"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text/60">No products found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 200]);
                  }}
                  className="mt-4 text-accent hover:text-text transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
