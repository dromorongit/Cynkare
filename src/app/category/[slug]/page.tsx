'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { SortOption } from '@/types';
import { staticCategories, getCategoryBySlug } from '@/lib/categories';

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
  image?: string;
  subcategories: { id: string; name: string; slug: string }[];
}

function CategoryContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');
  const subcategoryParam = searchParams.get('subcategory');
  
  const [category, setCategory] = useState<{ id: string; name: string; slug: string; subcategories: { id: string; name: string; slug: string }[] } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategoryParam || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, [categorySlug]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const foundCategory = staticCategories.find((c) => c.slug === categorySlug);
      if (foundCategory) {
        setCategory({ ...foundCategory, subcategories: [] });
        
        const productsRes = await fetch(`/api/products?categoryId=${foundCategory.id}`);
        const productsData = await productsRes.json();
        setProducts(productsData);
        
        const subcategoriesRes = await fetch('/api/subcategories');
        const allSubcategories = await subcategoriesRes.json();
        const categorySubcategories = allSubcategories
          .filter((s: { category: { id: string } }) => s.category.id === foundCategory.id)
          .map((s: { id: string; name: string; slug: string }) => ({ id: s.id, name: s.name, slug: s.slug }));
        setSubcategories(categorySubcategories);
        setCategory({ ...foundCategory, subcategories: categorySubcategories });
      } else {
        setCategory(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by subcategory
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(
        (p) => p.subcategory?.slug === selectedSubcategory
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
  }, [products, selectedSubcategory, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading text-text mb-4">Category not found</h2>
          <Link href="/shop" className="text-accent hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-text/60 mb-4">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/shop" className="hover:text-accent transition-colors">
                Shop
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-text">{category.name}</span>
            </nav>
            
            <h1 className="text-hero font-heading text-text">
              {category.name}
            </h1>
            <p className="text-text/60 mt-2">
              {filteredProducts.length} products available
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Subcategories Navigation */}
        {category.subcategories && category.subcategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-text/60">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedSubcategory === 'all'
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-secondary/50 text-text/70 hover:bg-secondary hover:text-text'
                }`}
              >
                All {category.name}
              </button>
              {category.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  onClick={() => setSelectedSubcategory(subcategory.slug)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedSubcategory === subcategory.slug
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-secondary/50 text-text/70 hover:bg-secondary hover:text-text'
                  }`}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

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
            {(selectedSubcategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 200) && (
              <button
                onClick={() => {
                  setSelectedSubcategory('all');
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
                <p className="text-text/60">No products found in this category.</p>
                <button
                  onClick={() => {
                    setSelectedSubcategory('all');
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

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
