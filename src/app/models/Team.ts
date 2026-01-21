import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema(
  {
    teamId: { type: Number, unique: true }, // 57 for Arsenal
    name: String,
    shortName: String,
    tla: String,
    crest: String,
    founded: Number,
    venue: String,
    clubColors: String,
    website: String,
    coach: {
      name: String,
      nationality: String,
    },
    competitions: [
      {
        id: Number,
        name: String,
        code: String,
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Team =
  mongoose.models.Team || mongoose.model('Team', TeamSchema);
