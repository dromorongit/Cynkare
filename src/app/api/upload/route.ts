import { NextRequest, NextResponse } from 'next/server';

// Increase body parser limit for file uploads
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      return NextResponse.json(
        { error: 'Cloudinary cloud name is missing' },
        { status: 500 }
      );
    }

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
    
    // Convert buffer to base64
    const base64Data = buffer.toString('base64');

    console.log('Uploading to Cloudinary via fetch API...');

    // Upload using fetch API directly - for unsigned uploads, no signature needed
    const uploadFormData = new FormData();
    uploadFormData.append('file', base64Data);
    uploadFormData.append('cloud_name', cloudName);
    uploadFormData.append('upload_preset', 'cynkare_unsigned');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary response error:', response.status, errorText);
      return NextResponse.json(
        { error: `Cloudinary upload failed: ${response.status}` },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log('Upload successful:', result.secure_url);

    return NextResponse.json({ 
      success: true, 
      url: result.secure_url,
      publicId: result.public_id
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error uploading to Cloudinary:', error);
    
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
