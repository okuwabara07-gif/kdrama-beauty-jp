import { getAllPosts, getPostBySlug } from '@/lib/posts';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return <div style={{padding:'2rem'}}>記事が見つかりませんでした</div>;
  }

  return (
    <article style={{maxWidth:'800px',margin:'0 auto',padding:'2rem'}}>
      <h1 style={{fontSize:'1.8rem',fontWeight:'bold',marginBottom:'1rem'}}>{post.title}</h1>
      <time style={{color:'#888',fontSize:'0.9rem'}}>{post.date}</time>
      <div style={{marginTop:'2rem',lineHeight:'1.8'}}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
