'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { staticCategories } from '@/lib/categories';

export default function Categories() {
  const categories = staticCategories;

  return (
    <section className="py-20 bg-primary">
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
            Shop by Category
          </h2>
          <p className="text-body text-text/60 max-w-2xl mx-auto">
            Explore our curated collection of premium skincare and beauty products
          </p>
        </motion.div>

        {/* Categories Vertical Stack - Image Banners */}
        <div className="flex flex-col gap-6">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/category/${category.slug}`}>
                  <div className="group relative h-[180px] rounded-lg overflow-hidden">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="bg-white text-black px-5 py-2.5 rounded-lg font-medium text-sm shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {category.name}
                      </span>
                      <span className="text-white/80 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {category.subcategories?.length || 0} subcategories
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No categories available yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
