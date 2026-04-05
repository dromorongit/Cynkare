import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Db } from 'mongodb';

const staticCategories = [
  { name: 'Body Lotions', slug: 'body-lotions' },
  { name: 'Bath Soaps', slug: 'bath-soaps' },
  { name: 'Face Creams & Cleansers', slug: 'face-creams-cleansers' },
  { name: 'Perfumes', slug: 'perfumes' },
  { name: 'Hair & Accessories', slug: 'hair-accessories' },
  { name: 'Skincare Sets', slug: 'skincare-sets' },
];

async function getDatabase(): Promise<{ client: MongoClient; db: Db }> {
  const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();
  return { client, db };
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== 'cynkare-seed-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = [];
    let client: MongoClient | null = null;

    try {
      const { client: mongoClient, db } = await getDatabase();
      client = mongoClient;
      const categoriesCollection = db.collection('Category');

      for (const category of staticCategories) {
        try {
          const existing = await categoriesCollection.findOne({ slug: category.slug });

          if (!existing) {
            await categoriesCollection.insertOne({
              name: category.name,
              slug: category.slug,
              image: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            results.push({ status: 'created', category: category.name });
          } else {
            results.push({ status: 'exists', category: category.name });
          }
        } catch (error) {
          results.push({ status: 'error', category: category.name, error: String(error) });
        }
      }
    } finally {
      if (client) {
        await client.close();
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}