// src/app/admin/add-post/[postId]/page.tsx
import { connectDB } from '@/app/lib/mongodb';
import { Post } from '@/app/models/Post';
import AddPostPage from '../page';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { postId: string } | Promise<{ postId: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  // unwrap params
  const { postId } = await params;

  await connectDB();

  console.log('Fetching post with ID:', postId);

  const postDoc = await Post.findById(postId).lean(); // lean() gives a plain object

  if (!postDoc) {
    console.log('Post not found for ID:', postId);
    notFound();
  }

  // ✅ Convert _id and Dates to strings
  const post = {
    ...postDoc,
    _id: postDoc._id.toString(),
    createdAt: postDoc.createdAt.toISOString(),
    updatedAt: postDoc.updatedAt.toISOString(),
  };

  console.log('Post found:', post.title);

  return <AddPostPage post={post} />;
}
