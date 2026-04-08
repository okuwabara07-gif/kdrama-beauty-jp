import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

function thumb(title: string, genre: string) {
  const seed = Math.abs((title+genre).split('').reduce((a:number,c:string)=>a+c.charCodeAt(0),0))
  return `https://picsum.photos/seed/${seed}/400/200`
}

export default function BlogPage() {
  const allPosts = getAllPosts()
  const genres = Array.from(new Set(allPosts.map((p: any) => p.genre).filter(Boolean))) as string[]

  return (
    <div className="container">

      {/* カテゴリナビ - 内部リンク群 */}
      <section className="section">
        <h1 className="section-title">記事一覧</h1>
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px',margin:'1rem 0'}}>
          <Link href="/blog" style={{padding:'6px 14px',background:'var(--primary)',color:'white',borderRadius:'20px',textDecoration:'none',fontSize:'0.75rem',fontWeight:700}}>
            すべて
          </Link>
          {genres.map(genre => (
            <Link key={genre} href={'/blog?genre='+encodeURIComponent(genre)}
              style={{padding:'6px 14px',background:'var(--card)',color:'var(--text)',borderRadius:'20px',textDecoration:'none',fontSize:'0.75rem',border:'1px solid var(--secondary)',fontWeight:600}}>
              {genre}
            </Link>
          ))}
        </div>
      </section>

      {/* カテゴリ別セクション表示 */}
      {genres.length > 0 ? genres.map(genre => {
        const genrePosts = allPosts.filter((p: any) => p.genre === genre).slice(0, 6)
        if (genrePosts.length === 0) return null
        return (
          <section key={genre} className="section">
            <h2 style={{fontSize:'1rem',fontWeight:700,color:'var(--accent)',marginBottom:'1rem',paddingBottom:'6px',borderBottom:'2px solid var(--primary)'}}>
              {genre}
            </h2>
            <div className="post-grid">
              {genrePosts.map((post: any) => (
                <Link key={post.slug} href={'/blog/'+post.slug} className="post-card">
                  <img src={thumb(post.title, post.genre||'')} alt={post.title} className="post-card-thumb" style={{objectFit:"cover"}} />
                  <div className="post-card-body">
                    <p className="post-card-genre">{post.genre}</p>
                    <h3 className="post-card-title">{post.title}</h3>
                    <p className="post-card-excerpt">{post.excerpt}</p>
                    <p className="post-card-date">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      }) : (
        <section className="section">
          <div className="post-grid">
            {allPosts.map((post: any) => (
              <Link key={post.slug} href={'/blog/'+post.slug} className="post-card">
                <img src={thumb(post.title, post.genre||'')} alt={post.title} className="post-card-thumb" style={{objectFit:"cover"}} />
                <div className="post-card-body">
                  <p className="post-card-genre">{post.genre}</p>
                  <h3 className="post-card-title">{post.title}</h3>
                  <p className="post-card-excerpt">{post.excerpt}</p>
                  <p className="post-card-date">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
