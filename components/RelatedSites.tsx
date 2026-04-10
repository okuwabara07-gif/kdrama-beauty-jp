import Link from 'next/link'

const RELATED_SITES = [
  { name: "ヘアカラーLAB", url: "https://haircolor-lab.vercel.app" },
  { name: "ニキビLAB", url: "https://acne-lab-jp.vercel.app" },
  { name: "アンチエイジングJP", url: "https://anti-aging-jp.vercel.app" },
  { name: "美容デバイスJP", url: "https://beauty-device-jp.vercel.app" },
  { name: "ビューティーフードJP", url: "https://beauty-food-jp.vercel.app" },
  { name: "ボディケアJP", url: "https://body-care-jp.vercel.app" },
  { name: "ファンデーションLAB", url: "https://foundation-lab-jp.vercel.app" },
  { name: "ヘアケアJP", url: "https://hair-care-jp.vercel.app" },

]

export default function RelatedSites() {
  return (
    <div style={{
      marginTop: '3rem',
      padding: '1.5rem',
      background: '#f8f9fa',
      borderRadius: '8px',
      borderTop: '2px solid #e9ecef'
    }}>
      <h3 style={{
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#333'
      }}>関連サイト</h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        {RELATED_SITES.map((site) => (
          
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.4rem 0.8rem',
              background: '#fff',
              border: '1px solid #dee2e6',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: '#495057',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}
          >
            {site.name}
          </a>
        ))}
      </div>
    </div>
  )
}
