import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post: any) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

function img(kw: string, w: number, h: number) {
  const seed = Math.abs(kw.split('').reduce((a:number,c:string)=>a+c.charCodeAt(0),0))
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

type Props = { params: Promise<{ slug: string }> }

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const related = getAllPosts().filter((p: any) => p.slug !== slug).slice(0, 4)
  const amz = `https://www.amazon.co.jp/s?k=${encodeURIComponent(post.title||'')}&tag=haircolorab22-22`
  const rak = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(post.title||'')}/?af=5253b9ed.08f9d938.5253b9ee.e71aefe8`

  return (
    <main>
      <header className="site-header">
        <div className="site-title">{post.title}</div>
      </header>
      <article style={{maxWidth:'860px',margin:'0 auto',padding:'2rem 1.5rem 4rem'}}>
        <img src={img(post.title,800,360)} alt={post.title} style={{width:'100%',height:'360px',objectFit:'cover',borderRadius:'16px',marginBottom:'1.5rem'}} />
        <span className="section-label">{post.genre}</span>
        <h1 style={{fontSize:'1.6rem',fontWeight:900,margin:'.75rem 0 .5rem',lineHeight:1.3,color:'var(--text)'}}>{post.title}</h1>
        <p style={{fontSize:'.75rem',opacity:.5,marginBottom:'2rem'}}>{post.date}</p>
        <div style={{marginBottom:'2rem',padding:'1.25rem',background:'var(--card)',borderRadius:'16px',border:'2px solid var(--secondary)'}}>
          <p style={{fontSize:'.75rem',color:'var(--accent)',fontWeight:700,marginBottom:'.75rem'}}>この記事を読む前に試してほしい</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
            <a href={amz} target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px',background:'var(--bg)',borderRadius:'12px',textDecoration:'none',border:'1px solid var(--secondary)'}}>
              <span style={{fontSize:'1.2rem'}}>📦</span>
              <div><div style={{fontSize:'.75rem',fontWeight:700,color:'var(--text)'}}>Amazonで探す</div></div>
            </a>
            <a href={rak} target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px',background:'var(--bg)',borderRadius:'12px',textDecoration:'none',border:'1px solid var(--secondary)'}}>
              <span style={{fontSize:'1.2rem'}}>🛒</span>
              <div><div style={{fontSize:'.75rem',fontWeight:700,color:'var(--text)'}}>楽天で探す</div></div>
            </a>
          </div>
        </div>
        <div style={{fontSize:'.95rem',lineHeight:1.9,color:'var(--text)'}}>
          <MDXRemote source={post.content} />
        </div>
        <img src={img(post.title,800,400)} alt={post.title} style={{width:'100%',height:'280px',objectFit:'cover',borderRadius:'12px',margin:'2rem 0'}} />
        <div style={{margin:'2rem 0',padding:'1.5rem',background:'var(--card)',borderRadius:'16px',border:'2px solid var(--primary)'}}>
          <p style={{fontSize:'.85rem',fontWeight:700,color:'var(--primary)',marginBottom:'1rem'}}>おすすめ商品ランキング</p>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <a href={amz} target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px',background:'var(--bg)',borderRadius:'10px',textDecoration:'none',border:'1px solid var(--primary)'}}>
              <span style={{fontWeight:900,color:'var(--primary)',minWidth:'36px'}}>1位</span>
              <span style={{fontSize:'.85rem',fontWeight:600,color:'var(--text)'}}>Amazonベストセラー</span>
              <span style={{marginLeft:'auto',fontSize:'.75rem',color:'var(--accent)'}}>→</span>
            </a>
            <a href={rak} target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px',background:'var(--bg)',borderRadius:'10px',textDecoration:'none',border:'1px solid var(--accent)'}}>
              <span style={{fontWeight:900,color:'var(--accent)',minWidth:'36px'}}>2位</span>
              <span style={{fontSize:'.85rem',fontWeight:600,color:'var(--text)'}}>楽天週間ランキング</span>
              <span style={{marginLeft:'auto',fontSize:'.75rem',color:'var(--accent)'}}>→</span>
            </a>
          </div>
        </div>
        <img src={img((post.genre||'')+' '+post.title,800,350)} alt={post.title} style={{width:'100%',height:'240px',objectFit:'cover',borderRadius:'12px',margin:'2rem 0'}} />
        <div style={{marginTop:'3rem',borderTop:'2px solid var(--secondary)',paddingTop:'2rem'}}>
          <p style={{fontSize:'.8rem',color:'var(--accent)',fontWeight:700,marginBottom:'1rem'}}>関連記事</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px'}}>
            {related.map((r: any) => (
              <a key={r.slug} href={'/blog/'+r.slug} style={{display:'block',padding:'12px',background:'var(--card)',borderRadius:'12px',border:'1px solid var(--secondary)',textDecoration:'none'}}>
                <div style={{fontSize:'.65rem',color:'var(--accent)',marginBottom:'4px'}}>{r.genre}</div>
                <div style={{fontSize:'.8rem',fontWeight:700,color:'var(--text)',lineHeight:1.3}}>{r.title}</div>
              </a>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
