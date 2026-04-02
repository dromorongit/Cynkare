'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, FolderTree, AlertTriangle, TrendingUp, Plus, Eye } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  inStock: boolean;
}

interface Stats {
  totalProducts: number;
  totalCategories: number;
  lowStockItems: number;
  totalViews: number;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalCategories: 0,
    lowStockItems: 0,
    totalViews: 0,
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsRes = await fetch('/api/products');
      const products = await productsRes.json();
      
      // Fetch categories
      const categoriesRes = await fetch('/api/categories');
      const categories = await categoriesRes.json();
      
      // Calculate stats
      const lowStock = products.filter((p: Product) => p.stockQuantity > 0 && p.stockQuantity <= 10).length;
      
      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        lowStockItems: lowStock,
        totalViews: 0, // This would need analytics integration
      });
      
      // Get recent products (last 5)
      setRecentProducts(products.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      name: 'Categories',
      value: stats.totalCategories,
      icon: FolderTree,
      color: 'bg-green-500',
    },
    {
      name: 'Low Stock Items',
      value: stats.lowStockItems,
      icon: AlertTriangle,
      color: 'bg-yellow-500',
    },
    {
      name: 'Page Views',
      value: stats.totalViews.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here is what is happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-2 p-6 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Product</span>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 p-6 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-5 h-5" />
          <span className="font-medium">View Website</span>
        </Link>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
          <Link
            href="/admin/products"
            className="text-sm text-accent hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">₵{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.stockQuantity}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          product.inStock && product.stockQuantity > 10
                            ? 'bg-green-100 text-green-800'
                            : product.inStock && product.stockQuantity > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.inStock && product.stockQuantity > 10
                          ? 'In Stock'
                          : product.inStock && product.stockQuantity > 0
                          ? 'Low Stock'
                          : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No products yet. Add your first product to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
