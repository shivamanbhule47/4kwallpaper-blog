import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { getAllPosts, getPostBySlug, getAllSlugs } from '@/lib/notion';
import ContentRenderer from '@/components/ContentRenderer';
import ProgressBar from '@/components/ProgressBar';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 60;

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date, images: post.coverImage ? [post.coverImage] : [] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="bg-background min-h-screen">
      <ProgressBar />
      <header className="relative px-6 pt-12 pb-8 md:pt-24 md:pb-16">
        <div className="max-w-prose mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-textMuted hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-surfaceHighlight text-xs font-medium text-accent border border-border">{post.category}</span>
          </div>

          <h1 className="text-headline font-bold text-white text-balance mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-textMuted">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(post.date)}</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{post.readingTime} min read</div>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div className="px-6 mb-16">
          <div className="max-w-grid mx-auto relative aspect-[21/9] rounded-2xl overflow-hidden">
            <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      )}

      <div className="px-6 pb-32">
        <div className="max-w-prose mx-auto">
          <ContentRenderer post={post} />
        </div>
      </div>
    </article>
  );
}
