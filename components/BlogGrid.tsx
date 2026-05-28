import { Post } from '@/types/post';
import BlogCard from './BlogCard';

export default function BlogGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="py-32 text-center">
        <p className="text-textMuted text-lg">No articles published yet.</p>
        <p className="text-textMuted text-sm mt-2">Check the &quot;Published&quot; checkbox in your Notion database.</p>
      </div>
    );
  }

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-grid mx-auto">
        <div className="mb-12">
          <h2 className="text-sm font-medium text-textMuted uppercase tracking-widest mb-2">Latest Stories</h2>
          <div className="h-px bg-border w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post, index) => (
            <div key={post.slug} className={index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}>
              <BlogCard post={post} featured={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
