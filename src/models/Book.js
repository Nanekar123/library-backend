import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
{
  title: String,
  author: String,
  category: String,

  availableCopies: {
    type: Number,
    default: 1
  },

  averageRating: {
    type: Number,
    default: 0
  },

  ratingsCount: {
    type: Number,
    default: 0
  }
},
{ timestamps: true }
);

export default mongoose.model("Book", bookSchema);