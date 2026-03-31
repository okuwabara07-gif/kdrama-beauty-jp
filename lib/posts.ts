import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content/blog')

export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  genre: string
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'))
  return files.map(file => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.description || content.slice(0, 100),
      genre: data.genre || '',
      content,
    }
  }).sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find(p => p.slug === slug) || null
}
