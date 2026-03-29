import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '韓国ドラマ美容', template: '%s | 韓国ドラマ美容' },
  description: '韓国ドラマの美容アイテムとK-Beautyトレンドを発信',
  verification: { google: 'xpdiFRYHloMJxfhCT-IMD08p5na4v9WUqvPY9OrDsHs' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=DM+Sans:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header className="site-header">
          <div className="header-inner">
            <a href="/" className="site-logo">
              <span className="logo-mark">🎬</span>
              <span className="logo-text">韓国ドラマ美容</span>
            </a>
            <nav className="site-nav">
              <a href="/">ホーム</a>
              <a href="/blog">記事一覧</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <p>© 2025 韓国ドラマ美容</p>
            <p className="footer-note">本サイトはアフィリエイト広告を含みます</p>
          </div>
        </footer>
      </body>
    </html>
  );
}