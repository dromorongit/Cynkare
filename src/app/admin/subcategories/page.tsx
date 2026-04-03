'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, FolderTree, X } from 'lucide-react';

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  category: {
    id: string;
    name: string;
  };
  _count?: {
    products: number;
  };
}

export default function AdminSubcategoriesPage() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; subcategoryId: string | null }>({ show: false, subcategoryId: null });
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [categoriesRes, subcategoriesRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/subcategories'),
      ]);
      
      const categoriesData = await categoriesRes.json();
      const subcategoriesData = await subcategoriesRes.json();
      
      console.log('Categories fetched:', categoriesData);
      console.log('Subcategories fetched:', subcategoriesData);
      
      // Ensure categories is always an array
      const validCategories = Array.isArray(categoriesData) ? categoriesData : [];
      const validSubcategories = Array.isArray(subcategoriesData) ? subcategoriesData : [];
      
      setCategories(validCategories);
      setSubcategories(validSubcategories);
    } catch (error) {
      console.error('Error fetching data:', error);
      setCategories([]);
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (subcategory?: Subcategory) => {
    if (subcategory) {
      setEditingSubcategory(subcategory);
      setFormData({ name: subcategory.name, categoryId: subcategory.category.id });
    } else {
      setEditingSubcategory(null);
      setFormData({ name: '', categoryId: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSubcategory(null);
    setFormData({ name: '', categoryId: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      if (editingSubcategory) {
        const response = await fetch(`/api/subcategories/${editingSubcategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            slug,
            categoryId: formData.categoryId,
          }),
        });
        
        if (response.ok) {
          const updatedSubcategory = await response.json();
          setSubcategories(subcategories.map((s) => 
            s.id === editingSubcategory.id ? updatedSubcategory : s
          ));
        }
      } else {
        const response = await fetch('/api/subcategories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            slug,
            categoryId: formData.categoryId,
          }),
        });
        
        if (response.ok) {
          const newSubcategory = await response.json();
          setSubcategories([newSubcategory, ...subcategories]);
        }
      }
      
      handleCloseModal();
    } catch (error) {
      console.error('Error saving subcategory:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/subcategories/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setSubcategories(subcategories.filter((s) => s.id !== id));
        setDeleteModal({ show: false, subcategoryId: null });
      } else {
        console.error('Failed to delete subcategory');
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  const groupedSubcategories = categories.map((category) => ({
    category,
    subcategories: subcategories.filter((s) => s.category.id === category.id),
  })).filter((group) => group.subcategories.length > 0);

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
        {groupedSubcategories.length > 0 ? (
          groupedSubcategories.map((group) => (
            <div key={group.category.id}>
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-4">
                <FolderTree className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold text-gray-900">{group.category.name}</h2>
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
                        {subcategory._count?.products || 0} products
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
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No subcategories yet. Add your first subcategory to get started!
          </div>
        )}
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
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
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
