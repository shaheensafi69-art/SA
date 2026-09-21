import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

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

export interface AppFileItem {
  name: string;
  key: string;
  url: string;
  size: number;
  sizeFormatted: string;
  extension: 'exe' | 'pkg' | 'dmg' | 'apk' | 'zip' | 'other';
  lastModified?: string;
}

export interface AppDownloadsData {
  windows: AppFileItem | null;
  mac: AppFileItem | null;
  android: AppFileItem | null;
  allFiles: AppFileItem[];
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 MB';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export async function getAppDownloadsFromR2(): Promise<AppDownloadsData> {
  const result: AppDownloadsData = {
    windows: null,
    mac: null,
    android: null,
    allFiles: [],
  };

  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'App For Win , Mac , Android',
    });

    const response = await r2Client.send(command);

    if (response.Contents && response.Contents.length > 0) {
      const items: AppFileItem[] = [];

      for (const obj of response.Contents) {
        if (!obj.Key || obj.Key.endsWith('/')) continue; // Skip folder entry

        const fileName = obj.Key.split('/').pop() || obj.Key;
        const lowerName = fileName.toLowerCase();

        let ext: AppFileItem['extension'] = 'other';
        if (lowerName.endsWith('.exe')) ext = 'exe';
        else if (lowerName.endsWith('.pkg')) ext = 'pkg';
        else if (lowerName.endsWith('.dmg')) ext = 'dmg';
        else if (lowerName.endsWith('.apk')) ext = 'apk';
        else if (lowerName.endsWith('.zip')) ext = 'zip';

        const encodedKey = obj.Key.split('/').map(encodeURIComponent).join('/');
        const url = `${PUBLIC_DOMAIN}/${encodedKey}`;

        const fileItem: AppFileItem = {
          name: fileName,
          key: obj.Key,
          url,
          size: obj.Size || 0,
          sizeFormatted: formatBytes(obj.Size || 0),
          extension: ext,
          lastModified: obj.LastModified ? obj.LastModified.toISOString() : undefined,
        };

        items.push(fileItem);
      }

      // Sort newer first
      items.sort((a, b) => {
        const dateA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
        const dateB = b.lastModified ? new Date(b.lastModified).getTime() : 0;
        return dateB - dateA;
      });

      result.allFiles = items;
      result.windows = items.find((f) => f.extension === 'exe') || null;
      result.mac = items.find((f) => f.extension === 'pkg' || f.extension === 'dmg') || null;
      result.android = items.find((f) => f.extension === 'apk') || null;
    }
  } catch (error) {
    console.error('Error fetching app downloads from R2:', error);
  }

  // Safe fallback to default uploaded files if R2 query is empty or failed
  if (!result.windows) {
    const key = 'App For Win , Mac , Android/Safi Academy Setup 0.1.0.exe';
    result.windows = {
      name: 'Safi Academy Setup 0.1.0.exe',
      key,
      url: `${PUBLIC_DOMAIN}/${key.split('/').map(encodeURIComponent).join('/')}`,
      size: 112025105,
      sizeFormatted: '107 MB',
      extension: 'exe',
    };
  }

  if (!result.mac) {
    const key = 'App For Win , Mac , Android/Safi Academy Installer-0.1.0.pkg';
    result.mac = {
      name: 'Safi Academy Installer-0.1.0.pkg',
      key,
      url: `${PUBLIC_DOMAIN}/${key.split('/').map(encodeURIComponent).join('/')}`,
      size: 132396239,
      sizeFormatted: '126 MB',
      extension: 'pkg',
    };
  }

  return result;
}

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

