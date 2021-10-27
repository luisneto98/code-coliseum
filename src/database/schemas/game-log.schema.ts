import { Schema } from 'mongoose';

export const GameLogSchema = new Schema(
  {},
  { strict: false,  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);
