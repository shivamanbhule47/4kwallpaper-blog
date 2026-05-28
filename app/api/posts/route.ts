import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/notion';

export const revalidate = 60;

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ posts: [], error: 'Failed to fetch posts' }, { status: 500 });
  }
}
