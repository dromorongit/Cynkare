'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, FolderTree } from 'lucide-react';
import { staticCategories } from '@/lib/categories';

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  category: {
    id: string;
  };
}

export default function AdminCategoriesPage() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/subcategories');
      if (!response.ok) {
        console.error('Failed to fetch subcategories:', response.status);
        setSubcategories([]);
      } else {
        const data = await response.json();
        // Ensure data is an array
        setSubcategories(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  };

  const getSubcategoriesByCategoryId = (categoryId: string) => {
    return subcategories.filter((s) => s.category?.id === categoryId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  const categories = staticCategories.map((cat) => ({
    ...cat,
    subcategories: getSubcategoriesByCategoryId(cat.id),
  }));

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Static product categories (read-only)</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Category Image */}
            <div className="aspect-video bg-gray-100 relative">
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            {/* Category Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <FolderTree className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-500">
                  {category.subcategories?.length || 0} subcategories
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subcategories Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Manage Subcategories</h2>
        <p className="text-gray-600 mb-6">
          You can create, edit, and delete subcategories under each category. Subcategories are optional.
        </p>
      </div>
    </div>
  );
}
