import { Product, Category, Testimonial, CategoryWithSubcategories } from '@/types';

export const skinConcerns = [
  { id: 'acne', name: 'Acne', slug: 'acne' },
  { id: 'stretch-marks', name: 'Stretch Marks', slug: 'stretch-marks' },
  { id: 'white-patches', name: 'White Patches', slug: 'white-patches' },
  { id: 'redness', name: 'Redness', slug: 'redness' },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Body Lotions',
    slug: 'body-lotions',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Bath Soaps',
    slug: 'bath-soaps',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Face Creams & Cleansers',
    slug: 'face-creams-cleansers',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Perfumes',
    slug: 'perfumes',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'Hair & Accessories',
    slug: 'hair-accessories',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
  },
];

export const categoriesWithSubcategories: CategoryWithSubcategories[] = [
  {
    id: '1',
    name: 'Body Lotions',
    slug: 'body-lotions',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    subcategories: [
      { id: '1-1', name: 'Whitening Lotions', slug: 'whitening-lotions' },
      { id: '1-2', name: 'Moisturizing Lotions', slug: 'moisturizing-lotions' },
      { id: '1-3', name: 'Body Butters', slug: 'body-butters' },
    ],
  },
  {
    id: '2',
    name: 'Bath Soaps',
    slug: 'bath-soaps',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
    subcategories: [
      { id: '2-1', name: 'African Black Soap', slug: 'african-black-soap' },
      { id: '2-2', name: 'Whitening Soaps', slug: 'whitening-soaps' },
      { id: '2-3', name: 'Organic Soaps', slug: 'organic-soaps' },
    ],
  },
  {
    id: '3',
    name: 'Face Creams & Cleansers',
    slug: 'face-creams-cleansers',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    subcategories: [
      { id: '3-1', name: 'Face Creams', slug: 'face-creams' },
      { id: '3-2', name: 'Face Cleansers', slug: 'face-cleansers' },
      { id: '3-3', name: 'Serums', slug: 'serums' },
      { id: '3-4', name: 'Face Masks', slug: 'face-masks' },
    ],
  },
  {
    id: '4',
    name: 'Perfumes',
    slug: 'perfumes',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
    subcategories: [
      { id: '4-1', name: 'Men Perfumes', slug: 'men-perfumes' },
      { id: '4-2', name: 'Women Perfumes', slug: 'women-perfumes' },
      { id: '4-3', name: 'Deodorants', slug: 'deodorants' },
      { id: '4-4', name: 'Body Mists', slug: 'body-mists' },
      { id: '4-5', name: 'Perfume Oils', slug: 'perfume-oils' },
    ],
  },
  {
    id: '5',
    name: 'Hair & Accessories',
    slug: 'hair-accessories',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    subcategories: [
      { id: '5-1', name: 'Wig Caps', slug: 'wig-caps' },
      { id: '5-2', name: 'Lace Closures', slug: 'lace-closures' },
      { id: '5-3', name: 'Lace Frontals', slug: 'lace-frontals' },
      { id: '5-4', name: 'Hair Care', slug: 'hair-care' },
      { id: '5-5', name: 'Accessories', slug: 'hair-accessories' },
    ],
  },
];

export const getCategoryBySlug = (slug: string): CategoryWithSubcategories | undefined => {
  return categoriesWithSubcategories.find((cat) => cat.slug === slug);
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Luxury Whitening Body Lotion',
    slug: 'luxury-whitening-body-lotion',
    category: 'Body Lotions',
    price: 89.99,
    originalPrice: 120.00,
    description: 'Our premium whitening body lotion is formulated with advanced brightening agents to give you radiant, even-toned skin. Enriched with vitamin C and natural extracts, it deeply moisturizes while lightening dark spots and imperfections. Suitable for all skin types.',
    shortDescription: 'Premium whitening lotion for radiant, even-toned skin',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: true,
    newArrival: false,
    concerns: ['white-patches', 'redness'],
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    name: 'Premium African Black Soap',
    slug: 'premium-african-black-soap',
    category: 'Bath Soaps',
    price: 24.99,
    description: 'Handcrafted authentic African black soap made with traditional ingredients. This gentle yet effective cleanser removes impurities while maintaining your skin natural moisture barrier. Perfect for sensitive skin and acne-prone areas.',
    shortDescription: 'Authentic handcrafted African black soap',
    images: [
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: true,
    newArrival: true,
    concerns: ['acne', 'redness'],
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Hydrating Face Cream',
    slug: 'hydrating-face-cream',
    category: 'Face Creams & Cleansers',
    price: 65.00,
    originalPrice: 85.00,
    description: 'A lightweight, non-greasy face cream that provides 24-hour hydration. Infused with hyaluronic acid and ceramides to plump and smooth fine lines. Perfect for daily use under makeup.',
    shortDescription: '24-hour hydration for smooth, plump skin',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    concerns: ['redness'],
    rating: 4.7,
    reviewCount: 56,
  },
  {
    id: '4',
    name: 'Luxury Rose Perfume',
    slug: 'luxury-rose-perfume',
    category: 'Perfumes',
    price: 149.99,
    description: 'An exquisite blend of Bulgarian rose, jasmine, and sandalwood. This long-lasting perfume wraps you in a cloud of elegance and sophistication. Perfect for special occasions.',
    shortDescription: 'Exquisite floral blend for elegant moments',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: '5',
    name: 'Vitamin C Brightening Serum',
    slug: 'vitamin-c-brightening-serum',
    category: 'Face Creams & Cleansers',
    price: 75.00,
    description: 'A potent vitamin C serum that brightens, evens skin tone, and protects against environmental damage. Formulated with 20% L-ascorbic acid for maximum effectiveness.',
    shortDescription: 'Potent brightening serum with 20% Vitamin C',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    concerns: ['acne', 'redness'],
    rating: 4.6,
    reviewCount: 78,
  },
  {
    id: '6',
    name: 'Revitalizing Face Cleanser',
    slug: 'revitalizing-face-cleanser',
    category: 'Face Creams & Cleansers',
    price: 35.00,
    description: 'A gentle, pH-balanced cleanser that removes makeup and impurities without stripping the skin. Contains green tea extract for soothing and antioxidant benefits.',
    shortDescription: 'Gentle pH-balanced cleanser with green tea',
    images: [
      'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    concerns: ['acne'],
    rating: 4.5,
    reviewCount: 45,
  },
  {
    id: '7',
    name: 'Oriental Amber Perfume',
    slug: 'oriental-amber-perfume',
    category: 'Perfumes',
    price: 129.99,
    originalPrice: 160.00,
    description: 'A warm, sensual fragrance with notes of amber, vanilla, and patchouli. This oriental perfume creates an intoxicating aura of mystery and allure.',
    shortDescription: 'Warm, sensual oriental fragrance',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: true,
    newArrival: false,
    rating: 4.8,
    reviewCount: 167,
  },
  {
    id: '8',
    name: 'Glow Enhancing Oil',
    slug: 'glow-enhancing-oil',
    category: 'Hairs/Wig Caps',
    price: 55.00,
    description: 'A blend of argan, jojoba, and rosehip oils that gives your skin a beautiful, natural glow. Lightweight formula absorbs quickly without leaving a greasy residue.',
    shortDescription: 'Lightweight oil for natural, radiant glow',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    rating: 4.7,
    reviewCount: 92,
  },
  {
    id: '9',
    name: 'Intensive Whitening Cream',
    slug: 'intensive-whitening-cream',
    category: 'Body Lotions',
    price: 110.00,
    description: 'Our most effective whitening cream targeting stubborn dark spots and hyperpigmentation. Contains kojic acid and alpha arbutin for visible results in 4 weeks.',
    shortDescription: 'Advanced formula for stubborn dark spots',
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    concerns: ['white-patches', 'stretch-marks'],
    rating: 4.4,
    reviewCount: 34,
  },
  {
    id: '10',
    name: 'Exfoliating Black Soap Bar',
    slug: 'exfoliating-black-soap-bar',
    category: 'Bath Soaps',
    price: 18.99,
    description: 'Black soap infused with walnut shell particles for gentle exfoliation. Removes dead skin cells and unclogs pores while maintaining skin hydration.',
    shortDescription: 'Gentle exfoliating black soap',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: false,
    newArrival: true,
    concerns: ['stretch-marks', 'redness'],
    rating: 4.6,
    reviewCount: 67,
  },
  {
    id: '11',
    name: 'Night Repair Cream',
    slug: 'night-repair-cream',
    category: 'Face Creams & Cleansers',
    price: 95.00,
    description: 'A rich, nourishing night cream that works while you sleep. Contains retinol and peptides to repair damage and reduce signs of aging.',
    shortDescription: 'Overnight anti-aging repair treatment',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: true,
    newArrival: false,
    rating: 4.8,
    reviewCount: 145,
  },
  {
    id: '12',
    name: 'Signature Musk Perfume',
    slug: 'signature-musk-perfume',
    category: 'Perfumes',
    price: 89.99,
    description: 'A sophisticated musky fragrance with notes of white musk, jasmine, and amber. Long-lasting and perfect for everyday wear.',
    shortDescription: 'Sophisticated musk for everyday elegance',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
    ],
    inStock: true,
    featured: false,
    newArrival: false,
    rating: 4.7,
    reviewCount: 112,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'The whitening lotion has transformed my skin! After 2 months, I can see a noticeable difference in my skin tone. Highly recommend!',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jessica K.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'Best face cleanser I have ever used. Gentle on my sensitive skin and leaves it feeling fresh and clean. Will definitely repurchase!',
    date: '2024-01-10',
  },
  {
    id: '3',
    name: 'Michelle R.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 4,
    comment: 'Love the luxury rose perfume! The scent lasts all day and I always receive compliments. Beautiful packaging too.',
    date: '2024-01-05',
  },
  {
    id: '4',
    name: 'Amanda L.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    rating: 5,
    comment: 'The African black soap is authentic and works wonders for my acne-prone skin. Cynkare never disappoints!',
    date: '2023-12-28',
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((product) => product.newArrival);
};

export const getProductsByConcern = (concern: string): Product[] => {
  return products.filter((product) => product.concerns?.includes(concern));
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, 4);
};
