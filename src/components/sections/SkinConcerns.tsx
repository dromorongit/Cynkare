'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { skinConcerns, getProductsByConcern } from '@/lib/products';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

export default function SkinConcerns() {
  const [activeConcern, setActiveConcern] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const handleConcernClick = (slug: string) => {
    if (activeConcern === slug) {
      setActiveConcern(null);
      setProducts([]);
    } else {
      setActiveConcern(slug);
      setProducts(getProductsByConcern(slug));
    }
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-section font-heading text-text mb-4">
            Shop by Skin Concern
          </h2>
          <p className="text-body text-text/60 max-w-2xl mx-auto">
            Find the perfect products for your specific skin needs
          </p>
        </motion.div>

        {/* Skin Concerns Grid - Clickable Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {skinConcerns.map((concern, index) => (
            <motion.div
              key={concern.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => handleConcernClick(concern.slug)}
                className={`w-full group relative h-[120px] rounded-lg overflow-hidden transition-all duration-300 ${
                  activeConcern === concern.slug ? 'ring-2 ring-accent' : ''
                }`}
              >
                <Image
                  src={`https://images.unsplash.com/photo-${index === 0 ? '1611930022073-b7a4ba5fcccd' : index === 1 ? '1571781926291-c477ebfd024b' : index === 2 ? '1620916566398-39f1143ab7be' : '1608248597279-f99d160bfcbc'}?w=600&h=400&fit=crop`}
                  alt={concern.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                
                {/* Centered Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white text-black px-4 py-2 rounded-lg font-medium text-sm shadow-lg group-hover:scale-105 transition-transform duration-300">
                    {concern.name}
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Products for Selected Concern */}
        {activeConcern && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-heading text-text">
                Products for {skinConcerns.find(c => c.slug === activeConcern)?.name}
              </h3>
              <Link 
                href={`/shop?concern=${activeConcern}`}
                className="text-accent hover:text-text transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Show message if no products found for a concern */}
        {activeConcern && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-text/60">
              No products found for this concern yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
