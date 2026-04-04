import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'ヘアカラーLAB'
  const genre = searchParams.get('genre') || '美容'

  return new ImageResponse(
    (
      <div style={{
        width: '1200px', height: '630px',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '80px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        fontFamily: 'sans-serif',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          marginBottom: '24px',
          background: 'rgba(147,51,234,0.3)',
          padding: '8px 20px', borderRadius: '20px',
          border: '1px solid rgba(147,51,234,0.5)',
        }}>
          <span style={{ color: '#c084fc', fontSize: '18px', fontWeight: 700 }}>{genre}</span>
        </div>
        <div style={{
          color: '#ffffff',
          fontSize: title.length > 20 ? '48px' : '60px',
          fontWeight: 900, lineHeight: 1.3,
          marginBottom: '32px', maxWidth: '900px',
        }}>
          {title}
        </div>
        <span style={{ color: '#9ca3af', fontSize: '24px' }}>ヘアカラーLAB</span>
        <div style={{
          position: 'absolute', bottom: '40px', right: '80px',
          color: '#4b5563', fontSize: '18px',
        }}>
          Powered by AOKAE LLC
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
