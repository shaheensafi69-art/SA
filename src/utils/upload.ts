/**
 * Client-side helper function to upload files to Cloudflare R2 via our /api/upload endpoint
 */
export async function uploadFileToR2(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Upload failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.url) {
    throw new Error('Upload succeeded but no public URL returned');
  }

  return data.url;
}
