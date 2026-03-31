import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'K-Drama Beauty',
  description: '韓国ドラマ・韓国女優の美容法',
  twitter: { card: 'summary_large_image', site: '@beauty_note_j' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3460729726810386" crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
