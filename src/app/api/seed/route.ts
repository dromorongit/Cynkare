import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const staticCategories = [
  { name: 'Body Lotions', slug: 'body-lotions' },
  { name: 'Bath Soaps', slug: 'bath-soaps' },
  { name: 'Face Creams & Cleansers', slug: 'face-creams-cleansers' },
  { name: 'Perfumes', slug: 'perfumes' },
  { name: 'Hair & Accessories', slug: 'hair-accessories' },
];

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== 'cynkare-seed-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = [];

    for (const category of staticCategories) {
      try {
        const existing = await prisma.category.findUnique({
          where: { slug: category.slug },
        });

        if (!existing) {
          const created = await prisma.category.create({
            data: {
              name: category.name,
              slug: category.slug,
            },
          });
          results.push({ status: 'created', category: created.name });
        } else {
          results.push({ status: 'exists', category: category.name });
        }
      } catch (error) {
        results.push({ status: 'error', category: category.name, error: String(error) });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}