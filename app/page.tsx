export default function Home() {
  return (
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
