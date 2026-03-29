import { getAllPosts } from '@/lib/posts';

export default function sitemap() {
  const posts = getAllPosts();
  const baseUrl = 'https://kdrama-beauty-jp.vercel.app';

  const postUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date().toISOString(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date().toISOString(), changeFrequency: 'daily' as const, priority: 0.9 },
    ...postUrls,
  ];
}
