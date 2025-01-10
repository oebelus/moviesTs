import { model, Schema } from "mongoose";

const TopSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    runtime: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    humanId: {
      type: Schema.Types.ObjectId,
      ref: "Human",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "updateOn",
    },
  }
);

export const Top = model("Top", TopSchema);
