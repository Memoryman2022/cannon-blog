// src/models/User.ts
import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'author'], default: 'author' },
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model('User', UserSchema);
