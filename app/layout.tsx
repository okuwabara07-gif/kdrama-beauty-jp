import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '韓国ドラマ美容 | K-Beauty Portal',
  description: '韓国ドラマ美容の最新比較ランキング・口コミ・おすすめ商品',
  twitter: { card: 'summary_large_image', site: '@beauty_note_j', creator: '@beauty_note_j' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;700&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet"/>
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3460729726810386" crossOrigin="anonymous"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
