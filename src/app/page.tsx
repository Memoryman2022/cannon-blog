'use server';

import { connectDB } from './lib/mongodb';
import { Post } from './models/Post';

interface Props {
  searchParams?: { search?: string };
}

export default async function HomePage({ searchParams }: Props) {
  await connectDB();

  const params = await searchParams;
  const searchQuery = params?.search?.trim() || '';

  const filter = searchQuery
    ? {
        published: true,
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { subtitle: { $regex: searchQuery, $options: 'i' } },
        ],
      }
    : { published: true };

    console.log('searchParams:', searchParams);


  const posts = await Post.find(filter).sort({ createdAt: -1 }).lean();

  return (
    <main className="min-h-screen p-6 px-[300px] bg-black">
      <h1 className="w-full text-2xl font-bold mb-6 text-white">POST FEED</h1>

      {posts.length ? (
        <div className="grid gap-6 ">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl text-black font-semibold mb-1 uppercase">
                {post.title}
              </h2>
              {post.subtitle && (
                <h3 className="text-gray-600 mb-2 uppercase">{post.subtitle}</h3>
              )}
              <p className="text-gray-700 text-sm mb-3">
                {post.content.slice(0, 150)}...
              </p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{post.author || 'Anonymous'}</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </div>
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
