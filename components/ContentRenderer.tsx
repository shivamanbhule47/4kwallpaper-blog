'use client';

import { Post } from '@/types/post';

export default function ContentRenderer({ post }: { post: Post }) {
  // Split content by newlines to create paragraphs
  const paragraphs = post.content.split('\n').filter(p => p.trim().length > 0);

  return (
    <div className="prose prose-invert prose-lg max-w-none">
      {paragraphs.map((paragraph, index) => {
        // Check if it's a heading
        if (paragraph.startsWith('# ')) {
          return <h1 key={index} className="text-3xl md:text-4xl font-bold mt-16 mb-6 text-white">{paragraph.replace('# ', '')}</h1>;
        }
        if (paragraph.startsWith('## ')) {
          return <h2 key={index} className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-white">{paragraph.replace('## ', '')}</h2>;
        }
        if (paragraph.startsWith('### ')) {
          return <h3 key={index} className="text-xl md:text-2xl font-semibold mt-10 mb-3 text-white">{paragraph.replace('### ', '')}</h3>;
        }
        // Check if it's a list item
        if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
          return <li key={index} className="text-base md:text-lg text-textSecondary leading-relaxed ml-4">{paragraph.replace(/^[-*] /, '')}</li>;
        }
        // Check if it's a blockquote
        if (paragraph.startsWith('> ')) {
          return <blockquote key={index} className="border-l-2 border-accent pl-6 my-8 italic text-textSecondary text-lg">{paragraph.replace('> ', '')}</blockquote>;
        }
        // Regular paragraph
        return <p key={index} className="text-base md:text-lg text-textSecondary leading-[1.8] mb-6">{paragraph}</p>;
      })}
    </div>
  );
}
