import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  return (
    <main>
      <header className="site-header">
        <div className="site-title">{post.title}</div>
      </header>
      <main style={{maxWidth:'900px',margin:'0 auto',padding:'2rem 1.5rem 4rem'}}>
        <div className="section-label">{post.genre}</div>
        <h1 style={{fontFamily:'Cormorant Garamond,serif',fontWeight:300,fontSize:'1.4rem',margin:'1rem 0 0.5rem'}}>{post.title}</h1>
        <p style={{fontSize:'0.7rem',color:'var(--text-secondary)',marginBottom:'2rem'}}>{post.date}</p>
        <div style={{fontSize:'0.9rem',lineHeight:1.9}}>
          <MDXRemote source={post.content} />
        </div>
      </main>
    </main>
  )
}
