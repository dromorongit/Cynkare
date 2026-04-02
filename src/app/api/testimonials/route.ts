import { NextResponse } from 'next/server';

// Static testimonials data - in production this could come from a database
const testimonials = [
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

// GET all testimonials
export async function GET() {
  return NextResponse.json(testimonials);
}