export const staticCategories = [
  { 
    id: '1', 
    name: 'Body Lotions', 
    slug: 'body-lotions', 
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=600&fit=crop', 
    subcategories: [] 
  },
  { 
    id: '2', 
    name: 'Bath Soaps', 
    slug: 'bath-soaps', 
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=1200&h=600&fit=crop', 
    subcategories: [] 
  },
  { 
    id: '3', 
    name: 'Face Creams & Cleansers', 
    slug: 'face-creams-cleansers', 
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b19?w=1200&h=600&fit=crop', 
    subcategories: [] 
  },
  { 
    id: '4', 
    name: 'Perfumes', 
    slug: 'perfumes', 
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=600&fit=crop', 
    subcategories: [] 
  },
  { 
    id: '5', 
    name: 'Hair & Accessories', 
    slug: 'hair-accessories', 
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1200&h=600&fit=crop', 
    subcategories: [] 
  },
  { 
    id: '6', 
    name: 'Skincare Sets', 
    slug: 'skincare-sets', 
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&h=600&fit=crop', 
    subcategories: [] 
  },
];

export const getCategoryBySlug = (slug: string) => {
  return staticCategories.find(cat => cat.slug === slug);
};

export const getCategoryById = (id: string) => {
  return staticCategories.find(cat => cat.id === id);
};