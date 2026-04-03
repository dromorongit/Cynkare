import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Increase body parser limit for file uploads
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Log environment info for debugging
    console.log('Cloudinary config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'set' : 'not set',
      api_key: process.env.CLOUDINARY_API_KEY ? 'set' : 'not set',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'set' : 'not set',
    });

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    console.log('Processing file:', file.name, file.type, file.size);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert buffer to base64 data URL
    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

    console.log('Uploading to Cloudinary...');

    // Upload to Cloudinary
    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader.upload(
        base64Data,
        {
          folder: 'cynkare-products',
          transformation: [
            { width: 1200, height: 1200, crop: 'limit' },
            { quality: 'auto:good' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary error:', error);
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error('No result from Cloudinary'));
          }
        }
      );
    });

    console.log('Upload successful:', uploadResult.secure_url);

    // Return the Cloudinary URL
    return NextResponse.json({ 
      success: true, 
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error uploading to Cloudinary:', error);
    
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to upload file to Cloudinary' },
      { status: 500 }
    );
  }
}