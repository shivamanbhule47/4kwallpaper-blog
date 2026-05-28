import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/post';
import { formatDate } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block relative">
      <article className="relative min-h-[70vh] md:min-h-[85vh] flex items-end rounded-2xl overflow-hidden">
        {post.coverImage && (
          <>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          </>
        )}

        <div className="relative z-10 w-full p-6 md:p-12 lg:p-16 max-w-grid mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10">
              {post.category}
            </span>
            <span className="text-sm text-textSecondary">{formatDate(post.date)}</span>
          </div>

          <h1 className="text-display font-bold text-white text-balance max-w-4xl mb-4 group-hover:translate-x-1 transition-transform duration-500 ease-out-expo">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-textSecondary max-w-2xl text-balance leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 text-sm font-medium text-white/80 group-hover:text-accent transition-colors">
            Read Article
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}
