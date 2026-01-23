// src/models/Post.ts
import mongoose, { Schema, model, models } from 'mongoose';


const PostSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL-friendly
  content: { type: String, required: true },
  imageUrl: {type: String},
  author: { type: String, default: 'Anonymous' },
  tags: { type: [String], default: [], index: true },
  published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Post = models.Post || model('Post', PostSchema);
