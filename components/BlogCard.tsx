import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/post';
import { formatDate } from '@/lib/utils';

export default function BlogCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article>
        <div className={`relative overflow-hidden rounded-xl bg-surface mb-4 ${featured ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          ) : (
            <div className="w-full h-full bg-surfaceHighlight flex items-center justify-center">
              <span className="text-textMuted text-sm">4KWALLPAPER</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-textMuted">
            <span className="text-accent font-medium">{post.category}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
          </div>

          <h2 className={`font-bold text-white leading-tight group-hover:text-accent transition-colors duration-300 ${featured ? 'text-headline' : 'text-title'}`}>
            {post.title}
          </h2>

          <p className="text-sm text-textSecondary line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
