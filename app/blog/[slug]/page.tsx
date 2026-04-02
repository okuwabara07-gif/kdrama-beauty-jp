import { getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

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
        <h1 style={{fontFamily:'serif',fontWeight:300,fontSize:'1.4rem',margin:'1rem 0 0.5rem'}}>{post.title}</h1>
        <p style={{fontSize:'0.7rem',color:'#888',marginBottom:'2rem'}}>{post.date}</p>
        
        <div style={{marginBottom:'2rem',padding:'1rem',background:'linear-gradient(135deg,#faf7ff,#f5eeff)',borderRadius:'16px',border:'1.5px solid #e8d4ff'}}>
          <p style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:700,marginBottom:'0.75rem',letterSpacing:'0.05em'}}>この記事を読む前に試してほしい</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'0.75rem'}}>
            <a href="https://www.forcise.jp/ic/kerastase" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #e8d4ff'}}>
              <span style={{fontSize:'1.2rem'}}>💜</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>ケラスターゼを今すぐ試す</div><div style={{fontSize:'0.65rem',color:'#9333ea'}}>美容室専売 → 公式サイトへ</div></div>
            </a>
            <a href="https://kiwabi-japan.myshopify.com/pages/rv002-r-a8" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #fce4ec'}}>
              <span style={{fontSize:'1.2rem'}}>🌸</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>白髪染めを無料で試す</div><div style={{fontSize:'0.65rem',color:'#e91e8c'}}>口コミNo.1 → 公式サイトへ</div></div>
            </a>
          </div>
        </div>
        <div style={{fontSize:'0.9rem',lineHeight:1.9}}>
          <MDXRemote source={post.content} />
        </div>
        
        <div style={{marginTop:'3rem',borderTop:'2px solid #e8d4ff',paddingTop:'2rem'}}>
          <p style={{fontSize:'0.75rem',color:'#9333ea',marginBottom:'1rem',fontWeight:700}}>今すぐ試してほしいおすすめアイテム</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'1rem'}}>
            <a href="https://www.forcise.jp/ic/kerastase" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #f0e6ff',borderRadius:'12px',textDecoration:'none',background:'#faf7ff'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>💜</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>ケラスターゼ</div>
              <div style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:600}}>→ 今すぐ公式サイトへ</div>
            </a>
            <a href="https://kiwabi-japan.myshopify.com/pages/rv002-r-a8" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #ffe6f0',borderRadius:'12px',textDecoration:'none',background:'#fff7fa'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🌸</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>白髪染めNo.1</div>
              <div style={{fontSize:'0.7rem',color:'#e91e8c',fontWeight:600}}>→ 無料お試しはこちら</div>
            </a>
            <a href="https://haricchi.com/lp?u=aff_a8_retibaby" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #f0e6ff',borderRadius:'12px',textDecoration:'none',background:'#faf7ff'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>✨</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>レチベイビー</div>
              <div style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:600}}>→ 今すぐ試す</div>
            </a>
            <a href="https://colorpass-web.vercel.app/fortune" target="_blank" rel="noopener noreferrer" style={{display:'block',padding:'1rem',border:'1px solid #e8d4ff',borderRadius:'12px',textDecoration:'none',background:'linear-gradient(135deg,#f5eeff,#ede0ff)'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🔮</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#7c3aed',marginBottom:'0.25rem'}}>ラッキーコスメを占う</div>
              <div style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:600}}>→ 今日の運勢を見る</div>
            </a>
          </div>
        </div>
      </main>
    </main>
  )
}
