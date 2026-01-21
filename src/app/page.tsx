import { connectDB } from './lib/mongodb';
import { Post } from './models/Post';

export default async function HomePage() {
  await connectDB();
  const posts = await Post.find({ published: true }).lean();

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Cannon Blog</h1>
      {posts.length ? (
        <ul className="mt-4 space-y-4">
          {posts.map((post) => (
            <li key={post._id}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">No posts yet.</p>
      )}
    </main>
  );
}
