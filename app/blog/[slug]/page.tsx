'use client'
import { useEffect, useState } from 'react'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const allPosts = getAllPosts()
  const related = allPosts.filter(p => p.slug !== slug).slice(0, 5)
  const nextPost = allPosts.find(p => p.slug !== slug)

  return (
    <main>
      <header className="site-header">
        <div className="site-title">{post.title}</div>
      </header>
      <main style={{maxWidth:'900px',margin:'0 auto',padding:'2rem 1.5rem 4rem'}}>
        <div className="section-label">{post.genre}</div>
        <h1 style={{fontFamily:'serif',fontWeight:300,fontSize:'1.4rem',margin:'1rem 0 0.5rem'}}>{post.title}</h1>
        <p style={{fontSize:'0.7rem',color:'#888',marginBottom:'2rem'}}>{post.date}</p>
        <div style={{fontSize:'0.9rem',lineHeight:1.9}}>
          <MDXRemote source={post.content} />
        </div>
        <div style={{marginTop:'3rem',borderTop:'2px solid #e8d4ff',paddingTop:'2rem'}}>
          <p style={{fontSize:'0.75rem',color:'#9333ea',fontWeight:700,marginBottom:'1rem'}}>次に読む記事</p>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {related.map(r => (
              <a key={r.slug} href={`/blog/${r.slug}`} style={{display:'flex',gap:'12px',padding:'12px',background:'#faf7ff',borderRadius:'12px',border:'1px solid #e8d4ff',textDecoration:'none'}}>
                <div style={{fontSize:'2rem',flexShrink:0}}>📄</div>
                <div>
                  <div style={{fontSize:'0.7rem',color:'#9333ea',marginBottom:'4px'}}>{r.genre}</div>
                  <div style={{fontSize:'0.85rem',fontWeight:700,color:'#333'}}>{r.title}</div>
                  <div style={{fontSize:'0.7rem',color:'#888',marginTop:'4px'}}>{r.excerpt}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <SlideInRecommend nextSlug={nextPost?.slug ?? ''} nextTitle={nextPost?.title ?? ''} nextExcerpt={nextPost?.excerpt ?? ''} />
      </main>
    </main>
  )
}