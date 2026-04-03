import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { staticCategories } from '@/lib/categories';
import { MongoClient } from 'mongodb';

// Helper function to get category info from static categories
function getCategoryInfo(categoryId: string) {
  const cat = staticCategories.find(c => c.id === categoryId);
  return cat ? { id: cat.id, name: cat.name, slug: cat.slug } : null;
}

// GET all subcategories
export async function GET() {
  try {
    let subcategories;
    try {
      subcategories = await prisma.subcategory.findMany({
        include: {
          category: true,
          _count: {
            select: { products: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      console.log('Prisma failed fetching subcategories, using MongoDB native');
      
      // Fallback: fetch directly from MongoDB
      const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
      const client = new MongoClient(uri);
      try {
        await client.connect();
        const db = client.db();
        const collection = db.collection('Subcategory');
        
        const cursor = collection.find({}).sort({ createdAt: -1 });
        const docs = await cursor.toArray();
        
        // Map to include category info from static categories
        subcategories = docs.map(doc => ({
          id: doc._id?.toString() || doc.id,
          name: doc.name,
          slug: doc.slug,
          categoryId: doc.categoryId,
          category: getCategoryInfo(doc.categoryId) || { id: '', name: '', slug: '' },
          _count: { products: 0 },
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        }));
      } finally {
        await client.close();
      }
    }
    return NextResponse.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    // Return empty array instead of 500 to prevent client crashes
    return NextResponse.json([]);
  }
}

// Helper to create subcategory using MongoDB native driver
async function createSubcategoryNative(name: string, slug: string, categoryId: string) {
  const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('Subcategory');
    
    const categoryInfo = getCategoryInfo(categoryId);
    if (!categoryInfo) {
      throw new Error('Invalid category ID');
    }
    
    // Insert the subcategory
    const result = await collection.insertOne({
      name,
      slug,
      categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Return with embedded category info (like Prisma would)
    return {
      id: result.insertedId.toString(),
      name,
      slug,
      categoryId,
      category: {
        id: categoryInfo.id,
        name: categoryInfo.name,
        slug: categoryInfo.slug,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } finally {
    await client.close();
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

    // Use MongoDB native driver to create subcategory (more reliable)
    const subcategory = await createSubcategoryNative(name, slug, categoryId);

    return NextResponse.json(subcategory, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating subcategory:', error);
    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 }
    );
  }
}
