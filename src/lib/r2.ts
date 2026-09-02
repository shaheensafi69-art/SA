import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || 'ae2ea912e7711e0510c3ad77a73a4187';
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '3176dbbcaf422be37d1b328a5e5e978d';
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || 'e23148fd6f7b246c56aac682eead9022ad4e8ea574aeec35c148f31466a09083';

export const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'safiacademy-media';
export const PUBLIC_DOMAIN = (process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || 'https://media.safiacademy.org').replace(/\/$/, '');

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadToR2(
  fileBuffer: Buffer,
  folder: string,
  fileName: string,
  mimeType: string
): Promise<string> {
  // Normalize folder path without leading/trailing slashes
  const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
  const key = cleanFolder ? `${cleanFolder}/${fileName}` : fileName;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  await r2Client.send(command);

  return `${PUBLIC_DOMAIN}/${key}`;
}

export async function deleteFromR2(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await r2Client.send(command);
}
