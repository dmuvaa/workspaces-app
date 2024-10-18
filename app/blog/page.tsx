import { client } from '@/lib/sanity';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function getPosts() {
  return await client.fetch(`*[_type == "post"] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt
  }`);
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
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              <p>{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}