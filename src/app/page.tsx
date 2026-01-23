'use server';

import { connectDB } from './lib/mongodb';
import { Post } from './models/Post';
import Image from 'next/image';
import Link from 'next/link';


interface Props {
  searchParams?: Promise<{ search?: string; tags?: string; }>;
}

const ADMIN_MODE = true; // TEMPORARY — replace with real auth

type MongoFilter = {
  [key: string]: unknown;
};

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const searchQuery = params?.search?.trim() || '';
  const selectedTags = params?.tags
    ? params.tags.split(',').filter(Boolean)
    : [];

  await connectDB();
   
  const filter: MongoFilter = {
    published: true,
  };

  // Search text
  if (searchQuery) {
    filter.$or = [
      { title: { $regex: searchQuery, $options: 'i' } },
      { subtitle: { $regex: searchQuery, $options: 'i' } },
    ];
  }

  // Tag filtering
  if (selectedTags.length > 0) {
    filter.tags = { $in: selectedTags };
  }

  const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();

  return (
    <main className="min-h-screen p-6 px-[300px] bg-black">
      <h1 className="w-full text-2xl font-bold mb-6 text-white">POST FEED</h1>

      {posts.length ? (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post._id.toString()}
              className="relative bg-white rounded-lg shadow p-4 pr-44 hover:shadow-lg transition-shadow duration-200"
            >
              {/* IMAGE */}
              {post.imageUrl && (
                <div className="absolute top-4 right-4 w-32 h-32 rounded overflow-hidden bg-gray-100">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              )}

              <h2 className="text-xl text-black font-semibold mb-1 uppercase">
                {post.title}
              </h2>

              {post.subtitle && (
                <h3 className="text-gray-600 mb-2 uppercase">{post.subtitle}</h3>
              )}

              <p className="text-gray-700 text-sm mb-3">
                {post.content.slice(0, 150)}...
              </p>

              <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                <span>{post.author || 'Anonymous'}</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-GB')}
                </span>
              </div>

              {/* ADMIN EDIT BUTTON */}
              {ADMIN_MODE && (
                <Link href={`/admin/add-post/${post._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">
  Edit Post
</Link>

              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-300">
          {searchQuery ? 'No results found.' : 'No posts yet.'}
        </p>
      )}
    </main>
  );
}
