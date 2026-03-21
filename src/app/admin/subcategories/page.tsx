'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, FolderTree, X } from 'lucide-react';

// Mock data
const mockSubcategories = [
  { id: '1', name: 'Wig Caps', category: 'Hair & Accessories', slug: 'wig-caps', productCount: 5 },
  { id: '2', name: 'Closures', category: 'Wig Caps', slug: 'closures', productCount: 3 },
  { id: '3', name: 'Frontals', category: 'Wig Caps', slug: 'frontals', productCount: 2 },
  { id: '4', name: 'Men Perfumes', category: 'Perfumes', slug: 'men-perfumes', productCount: 8 },
  { id: '5', name: 'Women Perfumes', category: 'Perfumes', slug: 'women-perfumes', productCount: 12 },
  { id: '6', name: 'Deodorants', category: 'Perfumes', slug: 'deodorants', productCount: 6 },
  { id: '7', name: 'Body Mists', category: 'Perfumes', slug: 'body-mists', productCount: 4 },
  { id: '8', name: 'Perfume Oils', category: 'Perfumes', slug: 'perfume-oils', productCount: 3 },
  { id: '9', name: 'Lace Closures', category: 'Hair & Accessories', slug: 'lace-closures', productCount: 4 },
  { id: '10', name: 'Lace Frontals', category: 'Hair & Accessories', slug: 'lace-frontals', productCount: 3 },
];

const categories = ['Hair & Accessories', 'Perfumes', 'Body Lotions', 'Bath Soaps', 'Face Creams & Cleansers'];

export default function AdminSubcategoriesPage() {
  const [subcategories, setSubcategories] = useState(mockSubcategories);
  const [showModal, setShowModal] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<typeof mockSubcategories[0] | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; subcategoryId: string | null }>({ show: false, subcategoryId: null });
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
  });

  const handleOpenModal = (subcategory?: typeof mockSubcategories[0]) => {
    if (subcategory) {
      setEditingSubcategory(subcategory);
      setFormData({ name: subcategory.name, category: subcategory.category });
    } else {
      setEditingSubcategory(null);
      setFormData({ name: '', category: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSubcategory(null);
    setFormData({ name: '', category: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSubcategory) {
      // Update existing
      setSubcategories(subcategories.map((s) => 
        s.id === editingSubcategory.id 
          ? { ...s, name: formData.name, category: formData.category }
          : s
      ));
    } else {
      // Add new
      const newSubcategory = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        productCount: 0,
      };
      setSubcategories([...subcategories, newSubcategory]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setSubcategories(subcategories.filter((s) => s.id !== id));
    setDeleteModal({ show: false, subcategoryId: null });
  };

  // Group subcategories by category
  const groupedSubcategories = categories.map((category) => ({
    category,
    subcategories: subcategories.filter((s) => s.category === category),
  })).filter((group) => group.subcategories.length > 0);

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subcategories</h1>
          <p className="text-gray-500 mt-1">Manage your product subcategories</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Subcategory
        </button>
      </div>

      {/* Subcategories by Category */}
      <div className="space-y-8">
        {groupedSubcategories.map((group) => (
          <div key={group.category}>
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-4">
              <FolderTree className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-gray-900">{group.category}</h2>
              <span className="text-sm text-gray-500">({group.subcategories.length} subcategories)</span>
            </div>

            {/* Subcategories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.subcategories.map((subcategory) => (
                <motion.div
                  key={subcategory.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{subcategory.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {subcategory.productCount} products
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(subcategory)}
                      className="p-2 text-gray-400 hover:text-accent transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModal({ show: true, subcategoryId: subcategory.id })}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingSubcategory ? 'Edit Subcategory' : 'Add Subcategory'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Subcategory Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategory Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Enter subcategory name"
                />
              </div>

              {/* Parent Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                {editingSubcategory ? 'Update Subcategory' : 'Add Subcategory'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Subcategory</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this subcategory?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal({ show: false, subcategoryId: null })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteModal.subcategoryId && handleDelete(deleteModal.subcategoryId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
