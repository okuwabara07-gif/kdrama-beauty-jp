import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  const base = new URL(request.url).origin;
  return new NextResponse(
    `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
}
