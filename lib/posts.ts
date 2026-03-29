import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  genre: string;
  tags: string[];
  excerpt: string;
};

export type Post = PostMeta & { content: string };

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.(mdx|md)$/, ''),
        title: data.title || file,
        date: data.date || '',
        genre: data.genre || '',
        tags: data.tags || [],
        excerpt: content.replace(/#+\s/g, '').slice(0, 120) + '…',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath  = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    genre: data.genre || '',
    tags: data.tags || [],
    excerpt: content.replace(/#+\s/g, '').slice(0, 120) + '…',
    content,
  };
}
