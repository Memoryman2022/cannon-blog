'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ADMIN_MODE = true;

interface PostType {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  imageUrl?: string;
  author?: string;
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const PRESET_TAGS = [
  "News",
  "Opinion",
  "Transfer",
  "Tactics",
  "Finances",
  "Match",
  "Injury",
  "UCL",
  "EPL",
  "ELC",
  "FACup",
];


interface Props {
  post?: PostType; // server passes this in
}

export default function AddPostPage({ post }: Props) {
  const router = useRouter();

  // Initialize state from the passed-in `post` if it exists
  const [title, setTitle] = useState(post?.title || '');
  const [subtitle, setSubtitle] = useState(post?.subtitle || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(post?.imageUrl || null);
  const [author, setAuthor] = useState(post?.author || 'Admin');
const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [published, setPublished] = useState(post?.published || false);
  const [message, setMessage] = useState('');

  if (!ADMIN_MODE) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p className="text-gray-600">You must be an admin to view this page.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadedUrl = imageUrl;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      const uploadRes = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        setMessage('Image upload failed');
        return;
      }
      uploadedUrl = uploadData.url;
    }

    // Use the post _id passed from server to determine update vs create
    const method = post?._id ? 'PUT' : 'POST';
    const url = post?._id ? `/api/posts/${post._id}` : '/api/posts';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim().toUpperCase(),
        subtitle: subtitle.trim(),
        slug,
        content,
        imageUrl: uploadedUrl,
        author,
        tags,
        published,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage(post?._id ? 'Post updated successfully!' : 'Post added successfully!');
      if (!post?._id) {
        setTitle('');
        setSubtitle('');
        setSlug('');
        setContent('');
        setImageFile(null);
        setImageUrl(null);
        setTags([]);
        setPublished(false);
      }
      router.refresh();
    } else {
      setMessage('Failed: ' + data.error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{post?._id ? 'Edit Post' : 'Add New Post'}</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block font-medium mb-1">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded p-2"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded p-2 h-32"
            required
          />
        </div>

        {/* Image preview */}
        {imageUrl && (
          <div className="mb-2 relative w-32 h-32">
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-cover rounded"
              sizes="128px"
            />
          </div>
        )}

        {/* Image upload */}
        <div>
          
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded p-2"
          />
        </div>

        {/* Tags */}
        <div>
  <label className="block font-medium mb-1">Tags</label>
  <div className="flex flex-wrap gap-2">
    {PRESET_TAGS.map((tag) => {
      const isSelected = tags.includes(tag);
      return (
        <button
          key={tag}
          type="button"
          onClick={() => {
            setTags((prev) =>
              prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
            );
          }}
          className={`px-3 py-1 rounded border ${
            isSelected
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {tag}
        </button>
      );
    })}
  </div>
</div>


        {/* Publish */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label>Publish now</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {post?._id ? 'Update Post' : 'Add Post'}
        </button>
      </form>
    </div>
  );
}
