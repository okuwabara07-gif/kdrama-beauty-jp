import RelatedSites from '@/components/RelatedSites'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      {children}
      <RelatedSites />
    </div>
  )
}
