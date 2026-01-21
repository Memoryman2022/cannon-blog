import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import { Post } from '@/app/models/Post';

export async function GET() {
  await connectDB();
  const posts = await Post.find({});
  const serialized = posts.map((p) => ({ ...p.toObject(), id: p._id.toString() }));
  return NextResponse.json(serialized);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();

  const post = await Post.create({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({ success: true, post });
}
