export const staticCategories = [
  { id: '1', name: 'Body Lotions', slug: 'body-lotions', image: '', subcategories: [] },
  { id: '2', name: 'Bath Soaps', slug: 'bath-soaps', image: '', subcategories: [] },
  { id: '3', name: 'Face Creams & Cleansers', slug: 'face-creams-cleansers', image: '', subcategories: [] },
  { id: '4', name: 'Perfumes', slug: 'perfumes', image: '', subcategories: [] },
  { id: '5', name: 'Hair & Accessories', slug: 'hair-accessories', image: '', subcategories: [] },
];

export const getCategoryBySlug = (slug: string) => {
  return staticCategories.find(cat => cat.slug === slug);
};

export const getCategoryById = (id: string) => {
  return staticCategories.find(cat => cat.id === id);
};