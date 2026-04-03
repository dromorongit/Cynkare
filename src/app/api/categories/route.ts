import { NextRequest, NextResponse } from 'next/server';
import { staticCategories } from '@/lib/categories';
import { MongoClient } from 'mongodb';

// GET all categories
export async function GET() {
  try {
    console.log('Fetching categories from database...');
    
    // Try MongoDB native driver first
    const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const db = client.db();
      const collection = db.collection('Category');
      
      const cursor = collection.find({}).sort({ createdAt: -1 });
      const categories = await cursor.toArray();
      
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
      
      // Map categories to include subcategories and count
      const categoriesWithData = await Promise.all(categories.map(async (cat) => {
        // Get subcategories
        const subcollection = db.collection('Subcategory');
        const subcategories = await subcollection.find({ categoryId: cat._id.toString() }).toArray();
        
        // Get product count
        const productCollection = db.collection('Product');
        const productCount = await productCollection.countDocuments({ categoryId: cat._id.toString() });
        
        return {
          id: cat._id.toString(),
          name: cat.name,
          slug: cat.slug,
          image: cat.image || null,
          subcategories: subcategories.map(s => ({
            id: s._id.toString(),
            name: s.name,
            slug: s.slug,
          })),
          _count: { products: productCount }
        };
      }));
      
      return NextResponse.json(categoriesWithData);
    } finally {
      await client.close();
    }
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

    // Use MongoDB native driver
    const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const db = client.db();
      const collection = db.collection('Category');
      
      const result = await collection.insertOne({
        name,
        slug,
        image: image || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return NextResponse.json({
        id: result.insertedId.toString(),
        name,
        slug,
        image: image || null,
        subcategories: [],
      }, { status: 201 });
    } finally {
      await client.close();
    }
  } catch (error: unknown) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
