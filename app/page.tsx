export default function Home() {
  return (
    <main style={{fontFamily:'sans-serif',maxWidth:'900px',margin:'0 auto',padding:'2rem'}}>
      <h1 style={{fontSize:'1.5rem',fontWeight:700,marginBottom:'1rem'}}>ようこそ</h1>
      <p style={{color:'#666',marginBottom:'2rem'}}>最新の記事をご覧ください。</p>

      {/* アフィリエイト */}
      <div style={{margin:'2rem 0',padding:'1rem',background:'linear-gradient(135deg,#faf7ff,#f5eeff)',borderRadius:'16px',border:'1.5px solid #e8d4ff'}}>
        <p style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:700,marginBottom:'0.75rem'}}>おすすめアイテム</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'0.75rem'}}>
          <a href="https://www.amazon.co.jp/?tag=haircolorab22-22" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #fce4ec'}}>
            <span style={{fontSize:'1.2rem'}}>📦</span>
            <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>Amazonでさがす</div><div style={{fontSize:'0.65rem',color:'#e91e8c'}}>翌日配送対応</div></div>
          </a>
          <a href="https://hb.afl.rakuten.co.jp/hgc/g00q0724.2bo11179.g00q0724.2bo12179/?pc=https%3A%2F%2Fwww.rakuten.co.jp%2F" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #e8d4ff'}}>
            <span style={{fontSize:'1.2rem'}}>🛒</span>
            <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>楽天でさがす</div><div style={{fontSize:'0.65rem',color:'#9333ea'}}>ポイント還元あり</div></div>
          </a>
        </div>
      </div>

      <a href="/blog" style={{display:'inline-block',padding:'12px 24px',background:'#9333ea',color:'white',borderRadius:'12px',textDecoration:'none',fontWeight:700}}>
        記事一覧を見る →
      </a>
    </main>
  )
}
