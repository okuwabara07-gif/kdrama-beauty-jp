'use client'
import { useEffect, useState } from 'react'

export default function SlideInRecommend({ nextSlug, nextTitle, nextExcerpt }: { nextSlug: string, nextTitle: string, nextExcerpt: string }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])
  if (!nextSlug) return null
  return (
    <div style={{position:'fixed',bottom:visible?'0':'-200px',left:0,right:0,transition:'bottom 0.4s ease',zIndex:100,padding:'1rem',background:'white',borderTop:'2px solid #e8d4ff',boxShadow:'0 -4px 20px rgba(147,51,234,0.1)'}}>
      <div style={{maxWidth:'600px',margin:'0 auto',display:'flex',alignItems:'center',gap:'12px'}}>
        <div style={{flex:1}}>
          <p style={{fontSize:'0.65rem',color:'#9333ea',fontWeight:700,margin:'0 0 4px'}}>次の記事</p>
          <p style={{fontSize:'0.85rem',fontWeight:700,color:'#333',margin:'0 0 2px'}}>{nextTitle}</p>
          <p style={{fontSize:'0.7rem',color:'#888',margin:0}}>{nextExcerpt}</p>
        </div>
        <div style={{display:'flex',gap:'8px',flexShrink:0}}>
          <a href={'/blog/'+nextSlug} style={{padding:'8px 16px',background:'#9333ea',color:'white',borderRadius:'8px',textDecoration:'none',fontSize:'0.8rem',fontWeight:700}}>読む →</a>
          <button onClick={() => setVisible(false)} style={{padding:'8px',background:'#f3f4f6',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'0.8rem'}}>✕</button>
        </div>
      </div>
    </div>
  )
}
