import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { Post } from '@/app/models/Post';

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {

  await connectDB();

  // ⚡ Unwrap params safely
  const params = context.params instanceof Promise ? await context.params : context.params;
  const id = params.id;

  const data = await req.json();

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).lean();

    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    const sanitizedPost = {
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };

    return NextResponse.json({ success: true, post: sanitizedPost });
  } catch (err: unknown) {
    console.error('Error updating post:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
