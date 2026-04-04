import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import SlideInRecommend from './SlideInRecommend'

export const dynamic = 'force-dynamic'

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
      <main style={{maxWidth:'860px',margin:'0 auto',padding:'2rem 1.5rem 4rem'}}>
        <div className="section-label">{post.genre}</div>
        <h1 style={{fontFamily:'serif',fontWeight:300,fontSize:'1.4rem',margin:'1rem 0 0.5rem'}}>{post.title}</h1>
        <p style={{fontSize:'0.7rem',color:'#888',marginBottom:'2rem'}}>{post.date}</p>

        {/* 記事前アフィリエイト */}
        <div style={{marginBottom:'2rem',padding:'1rem',background:'linear-gradient(135deg,#faf7ff,#f5eeff)',borderRadius:'16px',border:'1.5px solid #e8d4ff'}}>
          <p style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:700,marginBottom:'0.75rem'}}>この記事を読む前に試してほしい</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'0.75rem'}}>
            <a href="https://www.amazon.co.jp/?tag=haircolorab22-22" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #fce4ec'}}>
              <span style={{fontSize:'1.2rem'}}>📦</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>Amazonでさがす</div><div style={{fontSize:'0.65rem',color:'#e91e8c'}}>翌日配送対応</div></div>
            </a>
            <a href="https://hb.afl.rakuten.co.jp/hgc/g00q0724.n763w947.g00q0724.n763x2b5/?pc=https%3A%2F%2Fwww.rakuten.co.jp%2F" target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 12px',background:'white',borderRadius:'12px',textDecoration:'none',border:'1px solid #e8d4ff'}}>
              <span style={{fontSize:'1.2rem'}}>🛒</span>
              <div><div style={{fontSize:'0.75rem',fontWeight:700,color:'#333'}}>楽天でさがす</div><div style={{fontSize:'0.65rem',color:'#9333ea'}}>ポイント還元あり</div></div>
            </a>
          </div>
        </div>

        {/* 記事本文 */}
        <div style={{fontSize:'0.9rem',lineHeight:1.9}}>
          <MDXRemote source={post.content} />
        </div>

        {/* ランキングセクション */}
        <div style={{marginTop:'2.5rem',padding:'1.5rem',background:'#fff9f0',borderRadius:'16px',border:'1px solid #fde68a'}}>
          <p style={{fontSize:'0.75rem',color:'#d97706',fontWeight:700,marginBottom:'1rem'}}>🏆 おすすめランキングTOP3</p>
          {[
            {rank:1, label:'第1位', desc:'人気No.1！口コミ評価最高', color:'#f59e0b'},
            {rank:2, label:'第2位', desc:'コスパ最強・初心者におすすめ', color:'#9ca3af'},
            {rank:3, label:'第3位', desc:'プロも愛用する本格派', color:'#b45309'},
          ].map(item => (
            <a key={item.rank} href="https://www.amazon.co.jp/?tag=haircolorab22-22" target="_blank" rel="noopener noreferrer sponsored"
              style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px',marginBottom:'8px',background:'white',borderRadius:'12px',textDecoration:'none',border:`1px solid ${item.color}20`}}>
              <div style={{width:'36px',height:'36px',borderRadius:'50%',background:item.color,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:900,fontSize:'0.8rem',flexShrink:0}}>{item.rank}</div>
              <div>
                <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333'}}>{item.label}</div>
                <div style={{fontSize:'0.7rem',color:'#888'}}>{item.desc}</div>
              </div>
              <div style={{marginLeft:'auto',fontSize:'0.7rem',color:item.color,fontWeight:700}}>→ 見る</div>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <div style={{marginTop:'2.5rem'}}>
          <p style={{fontSize:'0.75rem',color:'#374151',fontWeight:700,marginBottom:'1rem'}}>❓ よくある質問</p>
          {[
            {q:'初心者でも始められますか？', a:'はい、初心者の方でも簡単に始められます。基本的なことから順番に解説しているので安心してください。'},
            {q:'どのくらいで効果が出ますか？', a:'個人差はありますが、継続することで2〜4週間で変化を感じる方が多いです。'},
            {q:'費用はどのくらいかかりますか？', a:'初期費用を抑えて始めることができます。まずは無料・低コストのものからお試しください。'},
          ].map((faq, i) => (
            <div key={i} style={{marginBottom:'12px',padding:'12px 16px',background:'#f9fafb',borderRadius:'12px',borderLeft:'3px solid #9333ea'}}>
              <p style={{fontSize:'0.8rem',fontWeight:700,color:'#1f2937',marginBottom:'4px'}}>Q. {faq.q}</p>
              <p style={{fontSize:'0.75rem',color:'#6b7280',margin:0}}>A. {faq.a}</p>
            </div>
          ))}
        </div>

        {/* 記事後アフィリエイト */}
        <div style={{marginTop:'2.5rem',borderTop:'2px solid #e8d4ff',paddingTop:'2rem'}}>
          <p style={{fontSize:'0.75rem',color:'#9333ea',fontWeight:700,marginBottom:'1rem'}}>今すぐ試してほしいおすすめアイテム</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'1rem'}}>
            <a href="https://www.amazon.co.jp/?tag=haircolorab22-22" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #f0e6ff',borderRadius:'12px',textDecoration:'none',background:'#faf7ff'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>📦</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>Amazon</div>
              <div style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:600}}>→ 今すぐ公式サイトへ</div>
            </a>
            <a href="https://hb.afl.rakuten.co.jp/hgc/g00q0724.n763w947.g00q0724.n763x2b5/?pc=https%3A%2F%2Fwww.rakuten.co.jp%2F" target="_blank" rel="noopener noreferrer sponsored" style={{display:'block',padding:'1rem',border:'1px solid #ffe6f0',borderRadius:'12px',textDecoration:'none',background:'#fff7fa'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.5rem'}}>🛒</div>
              <div style={{fontSize:'0.8rem',fontWeight:700,color:'#333',marginBottom:'0.25rem'}}>楽天市場</div>
              <div style={{fontSize:'0.7rem',color:'#e91e8c',fontWeight:600}}>→ ポイントお得</div>
            </a>
          </div>
        </div>

        {/* 関連記事 */}
        {related.length > 0 && (
          <div style={{marginTop:'2.5rem'}}>
            <p style={{fontSize:'0.75rem',color:'#9333ea',fontWeight:700,marginBottom:'1rem'}}>次に読む記事</p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {related.map((r: any) => (
                <a key={r.slug} href={'/blog/'+r.slug} style={{display:'flex',gap:'12px',padding:'12px',background:'#faf7ff',borderRadius:'12px',border:'1px solid #e8d4ff',textDecoration:'none'}}>
                  <div style={{fontSize:'1.5rem',flexShrink:0}}>📄</div>
                  <div>
                    <div style={{fontSize:'0.7rem',color:'#9333ea',marginBottom:'3px'}}>{r.genre}</div>
                    <div style={{fontSize:'0.82rem',fontWeight:700,color:'#333'}}>{r.title}</div>
                    <div style={{fontSize:'0.68rem',color:'#888',marginTop:'3px'}}>{r.excerpt}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <SlideInRecommend nextSlug={nextPost?.slug ?? ''} nextTitle={nextPost?.title ?? ''} nextExcerpt={nextPost?.excerpt ?? ''} />
      </main>
    </main>
  )
}
