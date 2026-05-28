import { getAllPosts } from '@/lib/notion';
import FeaturedPost from '@/components/FeaturedPost';
import BlogGrid from '@/components/BlogGrid';

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured) || posts[0];
  const gridPosts = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="bg-background">
      {featured && (
        <section className="px-4 pt-4 pb-8">
          <FeaturedPost post={featured} />
        </section>
      )}
      <BlogGrid posts={gridPosts} />
    </div>
  );
}
