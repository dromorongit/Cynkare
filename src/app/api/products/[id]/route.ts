import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// GET a single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const db = client.db();
      const collection = db.collection('Product');
      
      const product = await collection.findOne({ _id: new ObjectId(params.id) });
      
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      // Get category info
      let categoryInfo = null;
      let subcategoryInfo = null;
      
      try {
        if (product.categoryId) {
          const categoryCollection = db.collection('Category');
          const category = await categoryCollection.findOne({ _id: new ObjectId(product.categoryId) });
          if (category) {
            categoryInfo = {
              id: category._id.toString(),
              name: category.name,
              slug: category.slug,
            };
          }
        }
      } catch {}
      
      try {
        if (product.subcategoryId) {
          const subcategoryCollection = db.collection('Subcategory');
          const subcategory = await subcategoryCollection.findOne({ _id: new ObjectId(product.subcategoryId) });
          if (subcategory) {
            subcategoryInfo = {
              id: subcategory._id.toString(),
              name: subcategory.name,
              slug: subcategory.slug,
            };
          }
        }
      } catch {}
      
      return NextResponse.json({
        ...product,
        id: product._id.toString(),
        category: categoryInfo,
        subcategory: subcategoryInfo,
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Use MongoDB native driver
    const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const db = client.db();
      const collection = db.collection('Product');
      
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        {
          $set: {
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
            categoryId,
            subcategoryId: subcategoryId || null,
            updatedAt: new Date(),
          }
        },
        { returnDocument: 'after' }
      );
      
      if (!result) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        ...result,
        id: result._id.toString(),
      });
    } finally {
      await client.close();
    }
  } catch (error: unknown) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const uri = process.env.DATABASE_URL || 'mongodb://mongo:yWmmVabDenngmApSsOLydYuqqqkXElPl@caboose.proxy.rlwy.net:36367/cynkare?authSource=admin&directConnection=true&retryWrites=false';
    const client = new MongoClient(uri);
    
    try {
      await client.connect();
      const db = client.db();
      const collection = db.collection('Product');
      
      const result = await collection.deleteOne({ _id: new ObjectId(params.id) });
      
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ message: 'Product deleted successfully' });
    } finally {
      await client.close();
    }
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
