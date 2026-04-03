import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { staticCategories } from '@/lib/categories';

// GET all categories
export async function GET() {
  try {
    console.log('Fetching categories from database...');
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log('Categories found in DB:', categories.length);
    
    // If no categories in database, use static categories
    if (categories.length === 0) {
      console.log('Using static categories as fallback');
      const staticCats = staticCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        subcategories: [],
        _count: { products: 0 }
      }));
      return NextResponse.json(staticCats);
    }
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return static categories as fallback on error
    const staticCats = staticCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      image: cat.image,
      subcategories: [],
      _count: { products: 0 }
    }));
    return NextResponse.json(staticCats);
  }
}

// POST create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, image } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        image: image || null,
      },
      include: {
        subcategories: true,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating category:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Category with this name or slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
