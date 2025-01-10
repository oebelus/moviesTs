import { model, Schema } from "mongoose";

const HumanSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    top: [
      {
        type: Schema.Types.ObjectId,
        ref: "Top",
      },
    ],
    watchlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Watchlist",
      },
    ],
    watched: [
      {
        type: Schema.Types.ObjectId,
        ref: "Watched",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "updateOn",
    },
  }
);

export const Human = model("Human", HumanSchema);
