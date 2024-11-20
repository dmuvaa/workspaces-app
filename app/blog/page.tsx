import { client } from '@/lib/sanity';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    return await client.fetch(`*[_type == "post"] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt
    }`);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card key={post._id}>
            <CardHeader>
              <CardTitle>
                <Link href={`/blog/${post.slug.current}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p>{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
