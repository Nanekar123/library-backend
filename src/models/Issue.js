import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },

    issueDate: {
      type: Date,
      default: Date.now
    },

    dueDate: Date,

    returnDate: Date,

    fine: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["ISSUED", "RETURNED"],
      default: "ISSUED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);