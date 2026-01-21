// src/models/Post.ts
import mongoose, { Schema, model, models } from 'mongoose';


const PostSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true, default: 'No Subtitle' },
  slug: { type: String, required: true, unique: true }, // URL-friendly
  content: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  tags: { type: [String], default: [] },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Post = models.Post || model('Post', PostSchema);
