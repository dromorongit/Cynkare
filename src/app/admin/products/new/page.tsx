'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Upload, X, Save, Image as ImageIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import { staticCategories } from '@/lib/categories';

const categories = staticCategories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  subcategories: [] as string[],
}));

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // File input refs
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const additionalImageInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    category: '',
    subcategory: '',
    stockQuantity: '',
    sku: '',
    images: [] as string[],
    additionalImages: [] as string[],
    newArrival: false,
    bestSeller: false,
    featured: false,
    onSale: false,
  });

  // State for local image previews (before upload)
  const [mainImagePreviews, setMainImagePreviews] = useState<string[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Reset subcategory when category changes
    if (name === 'category') {
      setFormData((prev) => ({ ...prev, subcategory: '' }));
    }
  };

  // Handle main image file upload
  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Create local previews immediately
    const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file));
    setMainImagePreviews((prev) => [...prev, ...newPreviews]);

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, data.url],
          }));
        }
      }
    } catch (error) {
      console.error('Error uploading main image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
      // Reset input
      if (mainImageInputRef.current) {
        mainImageInputRef.current.value = '';
      }
    }
  };

  // Handle additional images file upload
  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Create local previews immediately
    const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file));
    setAdditionalImagePreviews((prev) => [...prev, ...newPreviews]);

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            additionalImages: [...prev.additionalImages, data.url],
          }));
        }
      }
    } catch (error) {
      console.error('Error uploading additional image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
      // Reset input
      if (additionalImageInputRef.current) {
        additionalImageInputRef.current.value = '';
      }
    }
  };

  // Add image URL manually
  const [imageInput, setImageInput] = useState('');
  const [additionalImageInput, setAdditionalImageInput] = useState('');

  const handleAddImageUrl = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput('');
    }
  };

  const handleAddAdditionalImageUrl = () => {
    if (additionalImageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, additionalImageInput.trim()],
      }));
      setAdditionalImageInput('');
    }
  };

  const handleRemoveImage = (index: number, type: 'main' | 'additional') => {
    if (type === 'main') {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, images: newImages }));
      // Also remove preview if exists
      if (index < mainImagePreviews.length) {
        URL.revokeObjectURL(mainImagePreviews[index]);
        setMainImagePreviews((prev) => prev.filter((_, i) => i !== index));
      }
    } else {
      const newImages = formData.additionalImages.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, additionalImages: newImages }));
      // Also remove preview if exists
      if (index < additionalImagePreviews.length) {
        URL.revokeObjectURL(additionalImagePreviews[index]);
        setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Get category ID
      const selectedCat = categories.find((c) => c.name === formData.category);
      
      // Find subcategory ID if selected
      let subcategoryId = null;
      if (formData.subcategory) {
        const subRes = await fetch('/api/subcategories');
        const allSubcategories = await subRes.json();
        const foundSub = allSubcategories.find((s: { name: string; category: { id: string } }) => 
          s.name === formData.subcategory && s.category.id === selectedCat?.id
        );
        if (foundSub) {
          subcategoryId = foundSub.id;
        }
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          slug,
          description: formData.description,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          images: formData.images,
          additionalImages: formData.additionalImages,
          stockQuantity: parseInt(formData.stockQuantity),
          sku: formData.sku || null,
          categoryId: selectedCat?.id,
          subcategoryId,
          newArrival: formData.newArrival,
          bestSeller: formData.bestSeller,
          featured: formData.featured,
          onSale: formData.onSale,
        }),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  // Fetch subcategories when category is selected
  const [availableSubcategories, setAvailableSubcategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!formData.category) {
        setAvailableSubcategories([]);
        return;
      }

      try {
        const response = await fetch('/api/subcategories');
        const allSubcategories = await response.json();
        
        // Find the category ID from static categories
        const selectedCat = categories.find((c) => c.name === formData.category);
        
        if (selectedCat) {
          // Filter subcategories by category ID
          const filtered = allSubcategories.filter(
            (sub: { category: { id: string } }) => sub.category.id === selectedCat.id
          );
          setAvailableSubcategories(filtered);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [formData.category]);

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500 mt-1">Fill in the product details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Enter product name"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Enter product description"
                />
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Regular Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₵</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    Sales Price (Discounted price - leave empty if not on sale)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₵</span>
                    <input
                      type="number"
                      id="originalPrice"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category & Subcategory */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category & Stock</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory */}
                <div>
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    disabled={!formData.category}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select subcategory</option>
                    {availableSubcategories.map((sub) => (
                      <option key={sub.id} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Stock Quantity */}
                <div>
                  <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    placeholder="0"
                  />
                </div>

                {/* SKU */}
                <div>
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                    SKU (Optional)
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    placeholder="SKU-001"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Product Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h2>
            
            {/* File Upload Button */}
            <div className="mb-4">
              <input
                ref={mainImageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleMainImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => mainImageInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload from Device'}
              </button>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* URL Input */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Enter image URL"
                />
              </div>
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Image Preview Grid - Shows both uploaded URLs and local previews */}
            {(formData.images.length > 0 || mainImagePreviews.length > 0) && (
              <div className="grid grid-cols-4 gap-4">
                {/* Show uploaded images */}
                {formData.images.map((img, index) => (
                  <div key={`uploaded-${index}`} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                    <Image
                      src={img}
                      alt={`Product ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, 'main')}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {/* Show local previews while uploading */}
                {mainImagePreviews.map((preview, index) => (
                  <div key={`preview-${index}`} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs">Uploading...</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {formData.images.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Upload from device or add image URL above
                </p>
              </div>
            )}
          </div>

          {/* Additional Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Images</h2>
            
            {/* File Upload Button */}
            <div className="mb-4">
              <input
                ref={additionalImageInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => additionalImageInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload from Device'}
              </button>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* URL Input */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={additionalImageInput}
                  onChange={(e) => setAdditionalImageInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  placeholder="Enter additional image URL"
                />
              </div>
              <button
                type="button"
                onClick={handleAddAdditionalImageUrl}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Additional Image Preview Grid - Shows both uploaded URLs and local previews */}
            {(formData.additionalImages.length > 0 || additionalImagePreviews.length > 0) && (
              <div className="grid grid-cols-4 gap-4">
                {/* Show uploaded images */}
                {formData.additionalImages.map((img, index) => (
                  <div key={`uploaded-${index}`} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                    <Image
                      src={img}
                      alt={`Additional ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, 'additional')}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {/* Show local previews while uploading */}
                {additionalImagePreviews.map((preview, index) => (
                  <div key={`preview-${index}`} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs">Uploading...</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {formData.additionalImages.length === 0 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Add additional product images (optional)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Flags */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Flags</h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="newArrival"
                  checked={formData.newArrival}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <span className="text-sm text-gray-700">New Arrival</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={formData.bestSeller}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <span className="text-sm text-gray-700">Best Seller</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <span className="text-sm text-gray-700">Featured</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="onSale"
                  checked={formData.onSale}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <span className="text-sm text-gray-700">On Sale</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
