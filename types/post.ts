export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage?: string;
  content: string;
  readingTime: number;
  featured?: boolean;
}
