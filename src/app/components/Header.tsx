import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-red-800 flex justify-between items-center">
      <h1 className="font-bold text-xl">Cannon Blog</h1>
      <div className="space-x-4">
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
        <Link href="/admin/add-post" className="text-white hover:underline">
          Add Post (Admin)
        </Link>
      </div>
    </nav>
  );
}
