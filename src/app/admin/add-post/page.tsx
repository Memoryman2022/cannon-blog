'use client';

import { useState } from 'react';

const ADMIN_MODE = true; // TEMPORARY — remove when you add real auth

export default function AddPostPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('')
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [author, setAuthor] = useState('Admin');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
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

  let imageUrl: string | null = null;

  if (imageFile) {
    const formData = new FormData();
    formData.append("file", imageFile);

    const uploadRes = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      setMessage("Image upload failed");
      return;
    }

    imageUrl = uploadData.url;
  }

  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.trim().toUpperCase(),
      subtitle: subtitle.trim(),
      slug,
      content,
      imageUrl, 
      author,
      tags: tags.split(",").map((t) => t.trim()),
      published,
    }),
  });

  const data = await res.json();

  if (data.success) {
    setMessage("Post added successfully!");
    setTitle("");
    setSubtitle("");
    setSlug("");
    setContent("");
    setImageFile(null);
    setTags("");
    setPublished(false);
  } else {
    setMessage("Failed to add post: " + data.error);
  }
};


  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div>
          <label className="block font-medium mb-1">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded p-2"
            required
          />
        </div>
        
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
        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded p-2 h-32"
            required
          />
        </div>
        <div>
  <label className="block font-medium mb-1">Add Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
    className="w-full"
  />
</div>

        <div>
          <label className="block font-medium mb-1">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded p-2"
          />
        </div>
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
          Add Post
        </button>
      </form>
    </div>
  );
}
