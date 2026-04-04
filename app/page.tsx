export default function Home() {
  return (
        {/* アフィリエイト */}
        <div style={{margin:'2rem 0',padding:'1rem',background:'linear-gradient(135deg,#faf7ff,#f5eeff)',borderRadius:'16px',border:'1.5px solid #e8d4ff'}}>
          <p style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:700,marginBottom:'0.75rem'}}>おすすめアイテム</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'0.75rem'}}>
            <a href="https://rpx.a8.net/svt/ejp?a8mat=3Z4N6T+XXXXXX+XXXX+XXXXXX" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #e8d4ff'}}>
              <span style={{fontSize:'1.2rem'}}>🛒</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>楽天でさがす</div><div style={{fontSize:'0.65rem',color:'#9333ea'}}>ポイント還元あり</div></div>
            </a>
            <a href="https://www.amazon.co.jp/?tag=haircolorab22-22" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #fce4ec'}}>
              <span style={{fontSize:'1.2rem'}}>📦</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>Amazonでさがす</div><div style={{fontSize:'0.65rem',color:'#e91e8c'}}>翌日配送対応</div></div>
            </a>
          </div>
        </div>
    <main>
      <header className="site-header">
        <div className="site-nav-bar">
          <div className="site-logo">K-Drama Beauty</div>
          <div style={{display:'flex',flexDirection:'column' as const,gap:4}}>
            <div style={{width:20,height:'0.5px',background:'#2A2218'}}></div>
            <div style={{width:14,height:'0.5px',background:'#2A2218'}}></div>
            <div style={{width:20,height:'0.5px',background:'#2A2218'}}></div>
          </div>
        </div>
        <div className="eyebrow" style={{marginBottom:8}}>K · BEAUTY PORTAL</div>
        <div className="section-title">韓国ドラマ美容のランキング</div>
      </header>

      <div className="portal-banner">
        <div className="portal-banner-label">FEATURED</div>
        <div className="portal-banner-title">AIパーソナルカラー診断 × 韓国コスメ</div>
        <a href="https://beauty-portal-jp.vercel.app" target="_blank" className="portal-banner-link">
          BEAUTY PORTAL →
        </a>
      </div>

      <div className="section-label">韓国ドラマ美容 · TOP ARTICLES</div>

      <footer className="site-footer">
        <span>© 2026 AOKAE LLC</span>
        <a href="https://beauty-portal-jp.vercel.app" target="_blank"
          style={{color:'#A89F94',borderBottom:'0.5px solid #DDD9D3',paddingBottom:1}}>
          BEAUTY PORTAL →
        </a>
      </footer>
    </main>
  );
}
