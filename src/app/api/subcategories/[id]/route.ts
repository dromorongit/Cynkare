import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET a single subcategory by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subcategory = await prisma.subcategory.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        products: true,
      },
    });

    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategory' },
      { status: 500 }
    );
  }
}

// PUT update a subcategory
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, slug, categoryId } = body;

    if (!name || !slug || !categoryId) {
      return NextResponse.json(
        { error: 'Name, slug, and categoryId are required' },
        { status: 400 }
      );
    }

    const subcategory = await prisma.subcategory.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error: unknown) {
    console.error('Error updating subcategory:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Subcategory with this name already exists in this category' },
        { status: 400 }
      );
    }
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update subcategory' },
      { status: 500 }
    );
  }
}

// DELETE a subcategory
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.subcategory.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Subcategory deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting subcategory:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete subcategory' },
      { status: 500 }
    );
  }
}
