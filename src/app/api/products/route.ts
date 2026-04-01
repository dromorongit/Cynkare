import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const newArrival = searchParams.get('newArrival');
    const bestSeller = searchParams.get('bestSeller');
    const categoryId = searchParams.get('categoryId');
    const subcategoryId = searchParams.get('subcategoryId');
    const limit = searchParams.get('limit');

    const where: Record<string, unknown> = {};

    if (featured === 'true') where.featured = true;
    if (newArrival === 'true') where.newArrival = true;
    if (bestSeller === 'true') where.bestSeller = true;
    if (categoryId) where.categoryId = categoryId;
    if (subcategoryId) where.subcategoryId = subcategoryId;

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        subcategory: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      originalPrice,
      images,
      inStock,
      stockQuantity,
      sku,
      featured,
      newArrival,
      bestSeller,
      onSale,
      rating,
      reviewCount,
      categoryId,
      subcategoryId,
    } = body;

    if (!name || !slug || !description || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Name, slug, description, price, and categoryId are required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription: shortDescription || null,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        images: images || [],
        inStock: inStock ?? true,
        stockQuantity: stockQuantity ? parseInt(stockQuantity) : 0,
        sku: sku || null,
        featured: featured ?? false,
        newArrival: newArrival ?? false,
        bestSeller: bestSeller ?? false,
        onSale: onSale ?? false,
        rating: rating ? parseFloat(rating) : null,
        reviewCount: reviewCount ? parseInt(reviewCount) : null,
        categoryId,
        subcategoryId: subcategoryId || null,
      },
      include: {
        category: true,
        subcategory: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating product:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 400 }
      );
    }
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Category or subcategory not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
