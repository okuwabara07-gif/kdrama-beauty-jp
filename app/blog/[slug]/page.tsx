import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import SlideInRecommend from './SlideInRecommend'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: any) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://haircolor-lab.vercel.app'
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [`${baseUrl}/og?title=${encodeURIComponent(post.title)}&genre=${encodeURIComponent(post.genre)}`],
    },
    twitter: { card: 'summary_large_image', title: post.title },
  }
}

type Props = { params: Promise<{ slug: string }> }

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const allPosts = getAllPosts()
  const related = allPosts.filter((p: any) => p.slug !== slug).slice(0, 5)
  const nextPost = allPosts.find((p: any) => p.slug !== slug)

  return (
    <main>
      <header className="site-header">
        <div className="site-title">{post.title}</div>
      </header>
      <main style={{maxWidth:'900px',margin:'0 auto',padding:'2rem 1.5rem 4rem'}}>
        <div className="section-label">{post.genre}</div>
        <h1 style={{fontFamily:'serif',fontWeight:300,fontSize:'1.4rem',margin:'1rem 0 0.5rem'}}>{post.title}</h1>
        <p style={{fontSize:'0.7rem',color:'#888',marginBottom:'2rem'}}>{post.date}</p>

        {/* アフィリエイトバナー（記事上） */}
        <div style={{marginBottom:'2rem',padding:'1rem',background:'linear-gradient(135deg,#faf7ff,#f5eeff)',borderRadius:'16px',border:'1.5px solid #e8d4ff'}}>
          <p style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:700,marginBottom:'0.75rem'}}>この記事を読む前に試してほしい</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'0.75rem'}}>
            <a href="https://www.amazon.co.jp/?tag=haircolorab22-22" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #fce4ec'}}>
              <span style={{fontSize:'1.2rem'}}>📦</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>Amazonで探す</div><div style={{fontSize:'0.65rem',color:'#e91e8c'}}>翌日配送対応</div></div>
            </a>
            <a href={`https://hb.afl.rakuten.co.jp/hgc/g00q0724.2bo11179.g00q0724.2bo12179/?pc=https%3A%2F%2Fwww.rakuten.co.jp%2F`} target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #ffd4d4'}}>
              <span style={{fontSize:'1.2rem'}}>🛒</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>楽天で探す</div><div style={{fontSize:'0.65rem',color:'#e91e8c'}}>ポイント還元あり</div></div>
            </a>
          </div>
        </div>

        {/* 記事本文 */}
        <div style={{fontSize:'0.9rem',lineHeight:1.9}}>
          <MDXRemote source={post.content} />
        </div>

        {/* ランキングバナー */}
        <div style={{margin:'2rem 0',padding:'1.5rem',background:'#fff9f0',borderRadius:'16px',border:'2px solid #ffd700'}}>
          <p style={{fontSize:'0.8rem',fontWeight:700,color:'#f59e0b',marginBottom:'1rem'}}>🏆 おすすめ商品ランキング</p>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {[
              {rank:'1位',label:'Amazonベストセラー',url:'https://www.amazon.co.jp/bestsellers?tag=haircolorab22-22',color:'#ffd700'},
              {rank:'2位',label:'楽天週間ランキング',url:'https://ranking.rakuten.co.jp/',color:'#c0c0c0'},
              {rank:'3位',label:'コスパ最強商品',url:'https://www.amazon.co.jp/?tag=haircolorab22-22',color:'#cd7f32'},
            ].map((item,i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer sponsored"
                style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px',background:'white',borderRadius:'10px',textDecoration:'none',border:`1px solid ${item.color}`}}>
                <span style={{fontSize:'1.2rem',fontWeight:900,color:item.color,minWidth:'36px'}}>{item.rank}</span>
                <span style={{fontSize:'0.85rem',fontWeight:600,color:'#333'}}>{item.label}</span>
                <span style={{marginLeft:'auto',fontSize:'0.75rem',color:'#9333ea'}}>→ 見る</span>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{margin:'2rem 0',padding:'1.5rem',background:'#f0f9ff',borderRadius:'16px',border:'1px solid #bae6fd'}}>
          <p style={{fontSize:'0.8rem',fontWeight:700,color:'#0284c7',marginBottom:'1rem'}}>❓ よくある質問</p>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {[
              {q:`${post.title}はどのくらいで効果が出ますか？`,a:'個人差はありますが、継続して1〜3ヶ月で効果を感じる方が多いです。'},
              {q:`${post.title}を始める際の注意点は？`,a:'無理をせず、まずは基本から始めましょう。体調に合わせて調整することが大切です。'},
              {q:`おすすめの商品・サービスはありますか？`,a:'Amazonや楽天でランキング上位の商品から試してみることをおすすめします。'},
            ].map((faq,i) => (
              <details key={i} style={{background:'white',borderRadius:'8px',padding:'12px',cursor:'pointer'}}>
                <summary style={{fontSize:'0.85rem',fontWeight:600,color:'#0284c7'}}>{faq.q}</summary>
                <p style={{fontSize:'0.8rem',color:'#666',marginTop:'8px',lineHeight:1.7}}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* 次に読む記事 */}
        <div style={{marginTop:'3rem',borderTop:'2px solid #e8d4ff',paddingTop:'2rem'}}>
          <p style={{fontSize:'0.75rem',color:'#9333ea',fontWeight:700,marginBottom:'1rem'}}>次に読む記事</p>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {related.map((r: any) => (
              <a key={r.slug} href={'/blog/'+r.slug} style={{display:'flex',gap:'12px',padding:'12px',background:'#faf7ff',borderRadius:'12px',border:'1px solid #e8d4ff',textDecoration:'none'}}>
                <div style={{fontSize:'2rem',flexShrink:0}}>📄</div>
                <div>
                  <div style={{fontSize:'0.7rem',color:'#9333ea',marginBottom:'4px'}}>{r.genre}</div>
                  <div style={{fontSize:'0.85rem',fontWeight:700,color:'#333'}}>{r.title}</div>
                  <div style={{fontSize:'0.7rem',color:'#888',marginTop:'4px'}}>{r.excerpt}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <SlideInRecommend nextSlug={nextPost?.slug ?? ''} nextTitle={nextPost?.title ?? ''} nextExcerpt={nextPost?.excerpt ?? ''} />
      </main>
    </main>
  )
}
