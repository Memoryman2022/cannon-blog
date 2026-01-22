import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { Post } from '@/app/models/Post';

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  console.log('PUT /api/posts/[id] called');
  console.log('Raw params:', context.params);

  await connectDB();

  // ⚡ Unwrap params safely
  const params = context.params instanceof Promise ? await context.params : context.params;
  const id = params.id;
  console.log('Resolved id for update:', id);

  const data = await req.json();
  console.log('PUT data received:', data);

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).lean();

    if (!post) {
      console.log('Post not found during update for ID:', id);
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    const sanitizedPost = {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };

    console.log('Post updated successfully:', sanitizedPost.title);
    return NextResponse.json({ success: true, post: sanitizedPost });
  } catch (err: unknown) {
    console.error('Error updating post:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
