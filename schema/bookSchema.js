import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "available",
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publish_year: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("book", bookSchema);
