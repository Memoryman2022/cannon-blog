import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema(
  {
    playerId: { type: Number, unique: true },
    teamId: Number,
    name: String,
    position: String,
    dateOfBirth: Date,
    nationality: String,
  },
  { timestamps: true }
);

export const Player =
  mongoose.models.Player || mongoose.model('Player', PlayerSchema);
