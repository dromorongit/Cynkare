'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { formatPrice, convertToGHS } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative overflow-hidden bg-secondary">
          {/* Product Image */}
          <div className="aspect-square relative">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.newArrival && (
                <span className="bg-text text-primary px-3 py-1 text-xs font-medium">
                  NEW
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-3 py-1 text-xs font-medium">
                  SALE
                </span>
              )}
            </div>

            {/* Quick Add Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <button
                onClick={handleAddToCart}
                className="w-full bg-white text-text py-3 font-medium hover:bg-accent transition-colors duration-300"
              >
                Add to Cart
              </button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-1">{product.category.name}</p>
            <h3 className="text-product-title font-body text-text group-hover:text-accent transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-price">₵{formatPrice(convertToGHS(product.price))}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₵{formatPrice(convertToGHS(product.originalPrice))}
                </span>
              )}
            </div>
            {product.rating && (
              <div className="flex items-center gap-1 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating!)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviewCount})</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
