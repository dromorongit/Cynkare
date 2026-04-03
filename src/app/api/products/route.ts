import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { staticCategories } from '@/lib/categories';

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

    // Use MongoDB native driver
    const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const db = client.db();
      const collection = db.collection('Product');
      
      const query: Record<string, unknown> = {};
      
      if (featured === 'true') query.featured = true;
      if (newArrival === 'true') query.newArrival = true;
      if (bestSeller === 'true') query.bestSeller = true;
      if (categoryId) query.categoryId = categoryId;
      if (subcategoryId) query.subcategoryId = subcategoryId;
      
      let cursor = collection.find(query).sort({ createdAt: -1 });
      if (limit) {
        cursor = cursor.limit(parseInt(limit));
      }
      
      const products = await cursor.toArray();
      
      // Get category info for each product
      const categoryCollection = db.collection('Category');
      const subcategoryCollection = db.collection('Subcategory');
      
      const productsWithCategory = await Promise.all(products.map(async (product) => {
        let categoryInfo = null;
        let subcategoryInfo = null;
        
        try {
          if (product.categoryId) {
            // Try to find by ObjectId first
            if (ObjectId.isValid(product.categoryId) && product.categoryId.length === 24) {
              const category = await categoryCollection.findOne({ _id: new ObjectId(product.categoryId) });
              if (category) {
                categoryInfo = {
                  id: category._id.toString(),
                  name: category.name,
                  slug: category.slug,
                };
              }
            } else {
              // It's a static category ID (like "1"), try to find by slug
              const staticCat = staticCategories.find(c => c.id === product.categoryId);
              if (staticCat) {
                categoryInfo = {
                  id: staticCat.id,
                  name: staticCat.name,
                  slug: staticCat.slug,
                };
              }
            }
          }
        } catch {
          // Category might not exist
        }
        
        try {
          if (product.subcategoryId) {
            if (ObjectId.isValid(product.subcategoryId) && product.subcategoryId.length === 24) {
              const subcategory = await subcategoryCollection.findOne({ _id: new ObjectId(product.subcategoryId) });
              if (subcategory) {
                subcategoryInfo = {
                  id: subcategory._id.toString(),
                  name: subcategory.name,
                  slug: subcategory.slug,
                };
              }
            }
          }
        } catch {
          // Subcategory might not exist
        }
        
        return {
          ...product,
          id: product._id.toString(),
          category: categoryInfo,
          subcategory: subcategoryInfo,
        };
      }));
      
      return NextResponse.json(productsWithCategory);
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array instead of 500 error to prevent page crash
    return NextResponse.json([]);
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
      additionalImages,
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

    // Try using MongoDB native driver to create product (more reliable)
    const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const db = client.db();
      
      const categoryCollection = db.collection('Category');
      
      // Check if categoryId is a valid ObjectId or a static category ID
      let finalCategoryId = categoryId;
      if (categoryId && ObjectId.isValid(categoryId) && categoryId.length === 24) {
        // It's a valid ObjectId, try to find the category
        const category = await categoryCollection.findOne({ _id: new ObjectId(categoryId) });
        if (category) {
          finalCategoryId = category._id;
        }
      }
      // If categoryId is not a valid ObjectId (e.g., "1" for static categories), use it as-is
      
      // Check if subcategory exists if provided
      let finalSubcategoryId = null;
      if (subcategoryId && ObjectId.isValid(subcategoryId) && subcategoryId.length === 24) {
        try {
          const subcategoryCollection = db.collection('Subcategory');
          const subcategory = await subcategoryCollection.findOne({ _id: new ObjectId(subcategoryId) });
          if (subcategory) {
            finalSubcategoryId = subcategory._id;
          }
        } catch {
          // Subcategory might not exist, continue without it
        }
      }

      // Create product using native MongoDB
      const productCollection = db.collection('Product');
      const result = await productCollection.insertOne({
        name,
        slug,
        description,
        shortDescription: shortDescription || null,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        images: images || [],
        additionalImages: additionalImages || [],
        inStock: inStock ?? true,
        stockQuantity: stockQuantity ? parseInt(stockQuantity) : 0,
        sku: sku || null,
        featured: featured ?? false,
        newArrival: newArrival ?? false,
        bestSeller: bestSeller ?? false,
        onSale: onSale ?? false,
        rating: rating ? parseFloat(rating) : null,
        reviewCount: reviewCount ? parseInt(reviewCount) : null,
        categoryId: finalCategoryId,
        subcategoryId: finalSubcategoryId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Fetch the created product with category info
      const createdProduct = await productCollection.findOne({ _id: result.insertedId });
      
      // Get category info
      let categoryInfo = null;
      if (createdProduct?.categoryId) {
        try {
          // Check if it's a valid ObjectId
          if (ObjectId.isValid(createdProduct.categoryId) && createdProduct.categoryId.length === 24) {
            const cat = await categoryCollection.findOne({ _id: new ObjectId(createdProduct.categoryId) });
            if (cat) {
              categoryInfo = { id: cat._id.toString(), name: cat.name, slug: cat.slug };
            }
          } else {
            // It's a static category ID, use static categories
            const staticCat = staticCategories.find(c => c.id === createdProduct.categoryId);
            if (staticCat) {
              categoryInfo = { id: staticCat.id, name: staticCat.name, slug: staticCat.slug };
            }
          }
        } catch {
          // Category might not exist
        }
      }

      return NextResponse.json({
        id: result.insertedId.toString(),
        ...createdProduct,
        category: categoryInfo,
        subcategory: null,
      }, { status: 201 });
    } finally {
      await client.close();
    }
  } catch (error: unknown) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
