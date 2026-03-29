import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 9);
  return (
    <>
      <section className="hero">
        <p className="hero-eyebrow">K-Drama Beauty</p>
        <h1 className="hero-title">韓国ドラマの美容を、もっとリアルに。</h1>
        <p className="hero-sub">話題の韓国ドラマで使われているコスメ・スキンケア・ヘアケアをまとめてご紹介。</p>
        <Link href="/blog" style={{ display: 'inline-block', background: 'var(--pink)', color: '#fff', padding: '12px 28px', borderRadius: '50px', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
          記事をみる →
        </Link>
      </section>
      <div className="container">
        <section className="section">
          <h2 className="section-title">最新記事</h2>
          {posts.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">📝</div>
              <p>記事はまだありません。</p>
            </div>
          ) : (
            <div className="post-grid">
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                  <div className="post-card-body">
                    <p className="post-card-genre">{post.genre}</p>
                    <h3 className="post-card-title">{post.title}</h3>
                    <p className="post-card-excerpt">{post.excerpt}</p>
                    <p className="post-card-date">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}