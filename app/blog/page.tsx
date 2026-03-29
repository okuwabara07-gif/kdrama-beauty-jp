import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();
  const GENRE_ICONS: Record<string, string> = {
    haircolor: '🎨', haircare: '✨', skincare: '🌸', nail: '💅', supplement: '💊',
  };
  return (
    <div className="container">
      <section className="section">
        <h1 className="section-title">記事一覧</h1>
        {posts.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">📝</div>
            <p>まだ記事がありません。</p>
          </div>
        ) : (
          <div className="post-grid">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                <div className="post-card-thumb">{GENRE_ICONS[post.genre] || '📄'}</div>
                <div className="post-card-body">
                  <p className="post-card-genre">{post.genre}</p>
                  <h2 className="post-card-title">{post.title}</h2>
                  <p className="post-card-excerpt">{post.excerpt}</p>
                  <p className="post-card-date">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
