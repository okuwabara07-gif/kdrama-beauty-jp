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
        <div style={{marginTop:'3rem',borderTop:'1px solid #eee',paddingTop:'2rem'}}>
          <p style={{fontSize:'0.75rem',color:'#999',marginBottom:'1rem',fontWeight:600}}>PR・おすすめアイテム</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'1rem'}}>
            <a href="https://www.forcise.jp/ic/kerastase" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #f0e6ff',borderRadius:'12px',textDecoration:'none',background:'#faf7ff'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>💜</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>ケラスターゼ</div>
              <div style={{fontSize:'0.7rem',color:'#666'}}>美容室専売ヘアケア →</div>
            </a>
            <a href="https://kiwabi-japan.myshopify.com/pages/rv002-r-a8" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #f0e6ff',borderRadius:'12px',textDecoration:'none',background:'#faf7ff'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🌸</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>白髪染めNo.1</div>
              <div style={{fontSize:'0.7rem',color:'#666'}}>カラートリートメント →</div>
            </a>
            <a href="https://shakelink.net/link.php?i=phwux2kr6pyj&m=mhwuxumw5ned" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #fff0e6',borderRadius:'12px',textDecoration:'none',background:'#fff8f5'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🧘</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>ホットヨガLAVA</div>
              <div style={{fontSize:'0.7rem',color:'#666'}}>体験レッスン無料 →</div>
            </a>
            <a href="https://colorpass-web.vercel.app/fortune" target="_blank" rel="noopener noreferrer" style={{display:'block',padding:'1rem',border:'1px solid #e8d4ff',borderRadius:'12px',textDecoration:'none',background:'linear-gradient(135deg,#f5eeff,#ede0ff)'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🔮</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#7c3aed',marginBottom:'0.25rem'}}>コパ占い</div>
              <div style={{fontSize:'0.7rem',color:'#9333ea'}}>今日の運勢を占う →</div>
            </a>
          </div>
        </div>
      </main>
    </main>
  )
}
