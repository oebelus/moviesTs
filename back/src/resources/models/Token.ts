import mongoose, { Document, Schema } from "mongoose";

export interface IToken extends Document {
  userId: mongoose.Types.ObjectId;
  refreshToken: string;
  expiresAt: Date;
}

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Human",
  },
  refreshToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export const Token = mongoose.model<IToken>("Token", TokenSchema);
