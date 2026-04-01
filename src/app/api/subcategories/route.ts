import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all subcategories
export async function GET() {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: {
        category: true,
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}

// POST create a new subcategory
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, categoryId } = body;

    if (!name || !slug || !categoryId) {
      return NextResponse.json(
        { error: 'Name, slug, and categoryId are required' },
        { status: 400 }
      );
    }

    const subcategory = await prisma.subcategory.create({
      data: {
        name,
        slug,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(subcategory, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating subcategory:', error);
    const prismaError = error as { code?: string };
    if (prismaError.code === 'P2002') {
      return NextResponse.json(
        { error: 'Subcategory with this name already exists in this category' },
        { status: 400 }
      );
    }
    if (prismaError.code === 'P2003') {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 }
    );
  }
}
