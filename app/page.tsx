import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <header className="site-header">
        <p className="eyebrow">🎬 K · BEAUTY PORTAL</p>
        <h1 className="site-title">韓国ドラマ美容</h1>
      </header>
      <nav style={{display:'flex',borderBottom:'0.5px solid #E8DDD8',overflowX:'auto'}}>
        <Link href="/" style={{flex:1,minWidth:80,padding:'10px 8px',textAlign:'center',fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:'2px',color:'#2C2420',borderBottom:'1px solid #2C2420',whiteSpace:'nowrap'}}>RANKING</Link>
        <Link href="/blog" style={{flex:1,minWidth:80,padding:'10px 8px',textAlign:'center',fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:'2px',color:'#C4B5AD',borderBottom:'1px solid transparent',whiteSpace:'nowrap'}}>ARTICLES</Link>
        <Link href="/privacy" style={{flex:1,minWidth:80,padding:'10px 8px',textAlign:'center',fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:'2px',color:'#C4B5AD',borderBottom:'1px solid transparent',whiteSpace:'nowrap'}}>PRIVACY</Link>
      </nav>
      <div className="portal-banner">
        <p className="portal-banner-label">FEATURED</p>
        <p className="portal-banner-title">AIパーソナルカラー診断 × 韓国コスメランキング</p>
        <a href="https://beauty-portal-jp.vercel.app" target="_blank" className="portal-banner-link">BEAUTY PORTAL →</a>
      </div>
      <section style={{padding:'0 24px'}}>
        <p className="section-label">韓国ドラマ美容 · TOP ARTICLES</p>
      </section>
      <footer className="site-footer">
        <span>© 2026 AOKAE LLC</span>
        <a href="https://beauty-portal-jp.vercel.app" target="_blank" className="footer-portal">BEAUTY PORTAL →</a>
      </footer>
    </main>
  );
}
