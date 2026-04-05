import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts().slice(0, 10)
  return (
    <main style={{fontFamily:'sans-serif',maxWidth:'900px',margin:'0 auto',padding:'2rem'}}>
      <h1 style={{fontSize:'1.5rem',fontWeight:700,marginBottom:'1rem'}}>ようこそ</h1>
      <p style={{color:'#666',marginBottom:'2rem'}}>最新の記事をご覧ください。</p>

      <div style={{margin:'2rem 0',padding:'1.25rem',background:'linear-gradient(135deg,#faf7ff,#f5eeff)',borderRadius:'16px',border:'1.5px solid #e8d4ff'}}>
        <p style={{fontSize:'0.75rem',color:'#9333ea',fontWeight:700,marginBottom:'12px'}}>おすすめピックアップ</p>
        <a href="https://px.a8.net/svt/ejp?a8mat=4AZR8U+CRMNSI+1USQ+4YM976" target="_blank" rel="noopener noreferrer sponsored"
          style={{display:'flex',alignItems:'center',gap:'10px',padding:'12px 16px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #f0e6ff',marginBottom:'8px'}}>
          <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#FF6B9D',flexShrink:0}}></div>
          <div>
            <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333'}}>オルビス</div>
            <div style={{fontSize:'0.7rem',color:'#888'}}>EPC246円 次世代クレンジング</div>
          </div>
          <span style={{marginLeft:'auto',fontSize:'0.75rem',color:'#FF6B9D',fontWeight:700}}>→ 詳しく見る</span>
        </a>
      </div>

      <div style={{marginBottom:'2rem'}}>
        {posts.map((post: any) => (
          <a key={post.slug} href={'/blog/'+post.slug}
            style={{display:'block',padding:'1rem',marginBottom:'8px',background:'white',borderRadius:'12px',border:'1px solid #e8d4ff',textDecoration:'none'}}>
            <div style={{fontSize:'0.7rem',color:'#9333ea',marginBottom:'4px'}}>{}</div>
            <div style={{fontSize:'0.9rem',fontWeight:700,color:'#333'}}>{}</div>
          </a>
        ))}
      </div>

      <a href="/blog" style={{display:'inline-block',padding:'12px 24px',background:'#9333ea',color:'white',borderRadius:'12px',textDecoration:'none',fontWeight:700}}>
        記事一覧を見る →
      </a>
    </main>
  )
}
