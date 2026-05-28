import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import Header from '@/components/Header';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: { default: '4KWALLPAPER — Premium Wallpapers & Visual Stories', template: '%s | 4KWALLPAPER' },
  description: 'A premium editorial blog for 4K wallpaper enthusiasts. Discover ultra-high-definition visuals, design insights, and digital art culture.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://4kwallpaper.blog'),
  openGraph: { type: 'website', locale: 'en_US', siteName: '4KWALLPAPER' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-textPrimary min-h-screen">
        <Header />
        <PageTransition>
          <main className="pt-16">{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
