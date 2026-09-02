import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';
    const customName = formData.get('customName') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    
    // Generate clean filename
    const ext = file.name.includes('.') ? file.name.split('.').pop() : '';
    const safeExt = ext ? `.${ext.toLowerCase()}` : '';
    const fileName = customName ? customName : `${uuidv4()}${safeExt}`;

    const publicUrl = await uploadToR2(
      fileBuffer,
      folder,
      fileName,
      file.type || 'application/octet-stream'
    );

    return NextResponse.json({
      success: true,
      url: publicUrl,
      key: `${folder}/${fileName}`,
      fileName,
      size: file.size,
      type: file.type
    });
  } catch (error: any) {
    console.error('Error uploading file to Cloudflare R2:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload file to Cloudflare R2' },
      { status: 500 }
    );
  }
}
