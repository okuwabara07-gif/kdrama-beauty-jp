import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

const GENRE_ICONS: Record<string, string> = {
  haircolor: '🎨', haircare: '✨', skincare: '🌸', nail: '💅', supplement: '💊',
};

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  return (
    <>
      <div className="article-hero">
        <div className="article-hero-inner">
          <p className="article-genre">{GENRE_ICONS[post.genre] || '📄'} {post.genre}</p>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta"><span>{post.date}</span></div>
          {post.tags.length > 0 && (
            <div className="tags">
              {post.tags.map(t => <span key={t} className="tag">#{t}</span>)}
            </div>
          )}
        </div>
      </div>
      <article className="article-body">
        <MDXRemote source={post.content} />
      </article>
    </>
  );
}
