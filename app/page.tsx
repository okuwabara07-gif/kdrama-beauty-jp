import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <header className="site-header">
        <p className="eyebrow">🎬 K · BEAUTY PORTAL</p>
        <h1 className="site-title">韓国ドラマ美容</h1>
      </header>
      <nav className="site-nav">
        <Link href="/" className="active">RANKING</Link>
        <Link href="/blog">ARTICLES</Link>
        <Link href="/privacy">PRIVACY</Link>
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
