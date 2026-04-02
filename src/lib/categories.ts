export const staticCategories = [
  { id: '1', name: 'Body Lotions', slug: 'body-lotions', image: '' },
  { id: '2', name: 'Bath Soaps', slug: 'bath-soaps', image: '' },
  { id: '3', name: 'Face Creams & Cleansers', slug: 'face-creams-cleansers', image: '' },
  { id: '4', name: 'Perfumes', slug: 'perfumes', image: '' },
  { id: '5', name: 'Hair & Accessories', slug: 'hair-accessories', image: '' },
];

export const getCategoryBySlug = (slug: string) => {
  return staticCategories.find(cat => cat.slug === slug);
};

export const getCategoryById = (id: string) => {
  return staticCategories.find(cat => cat.id === id);
};