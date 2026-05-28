import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: '4KWALLPAPER is a premium editorial destination for ultra-high-definition wallpaper enthusiasts.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-20 md:py-32">
      <div className="max-w-prose mx-auto">
        <h1 className="text-headline font-bold text-white mb-8">About 4KWALLPAPER</h1>
        <div className="space-y-6 text-lg text-textSecondary leading-relaxed">
          <p>4KWALLPAPER is a curated editorial platform dedicated to the art and craft of ultra-high-definition visual experiences. We believe that the screen is the modern canvas, and every wallpaper should be a masterpiece.</p>
          <p>Our publication covers the intersection of digital art, photography, visual design, and display technology — delivering stories that matter to creators, designers, and visual enthusiasts worldwide.</p>
          <p>Every article is published directly from our Notion database, ensuring a seamless, real-time editorial workflow with zero friction.</p>
          <div className="pt-8 border-t border-border">
            <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
            <p className="text-textSecondary">For editorial inquiries, partnerships, or submissions, reach out to us at <a href="mailto:hello@4kwallpaper.blog" className="text-accent hover:underline">hello@4kwallpaper.blog</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
