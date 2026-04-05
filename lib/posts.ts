import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return []
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .sort((a, b) => b.localeCompare(a))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return { slug, content, ...data } as any
    })
}

export function getPostBySlug(slug: string) {
  const exts = ['.mdx', '.md']
  for (const ext of exts) {
    const fullPath = path.join(postsDirectory, `${slug}${ext}`)
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return { slug, content, ...data } as any
    }
  }
  return null
}
