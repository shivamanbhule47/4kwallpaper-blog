import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/notion';

export const revalidate = 3600;

export default async function sitemap(): Promise<<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://4kwallpaper.blog';

  const routes = ['', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...blogRoutes];
}
