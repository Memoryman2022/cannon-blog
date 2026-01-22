import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import { Post } from "../../models/Post";

export async function GET() {
  await connectDB();
  const posts = await Post.find({}).sort({ createdAt: -1 });
  const serialized = posts.map((p) => ({
    ...p.toObject(),
    id: p._id.toString(),
  }));
  return NextResponse.json(serialized);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();

  try {
    const post = await Post.create({
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      content: data.content,
      author: data.author,
      tags: data.tags,
      published: data.published,
      imageUrl: data.imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, post });
  } catch (err: unknown) {
    let message = "Unknown error";

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json({ success: false, error: message });
  }
}
