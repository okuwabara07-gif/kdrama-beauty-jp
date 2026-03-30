import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const base = new URL(request.url).origin;
  let posts: any[] = [];
  try { posts = getAllPosts(); } catch {}
  const urls = [
    `<url><loc>${base}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${base}/blog</loc><changefreq>daily</changefreq><priority>0.9</priority></url>`,
    ...posts.map(p => `<url><loc>${base}/blog/${p.slug}</loc><lastmod>${p.date || '2026-01-01'}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`)
  ].join('
    ');
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
