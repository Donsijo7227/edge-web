// app/api/preview/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const secret = searchParams.get('secret');
 
  // Check the secret and next parameters
  if (secret !== process.env.SANITY_PREVIEW_SECRET || !slug) {
    return new Response('Invalid token', { status: 401 });
  }
 
  // Enable Draft Mode - properly handle the Promise
  const draftModeInstance = await draftMode();
  draftModeInstance.enable();
 
  // Redirect to the path from the fetched post
  redirect(`/${slug}`);
}