import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '韓国ドラマ美容 | K-Beauty Portal',
  description: '韓国ドラマ・韓国女優の美容法',
  openGraph: {
    title: '韓国ドラマ美容',
    description: '韓国ドラマ・韓国女優の美容法',
    url: 'https://kdrama-beauty-jp.vercel.app',
    siteName: 'K-Beauty Portal',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '韓国ドラマ美容',
    description: '韓国ドラマ・韓国女優の美容法',
    site: '@beauty_note_j',
    creator: '@beauty_note_j',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
