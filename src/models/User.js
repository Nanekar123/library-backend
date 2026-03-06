import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: String,

    role: {
      type: String,
      enum: ["USER", "AUTHOR", "ADMIN"],
      default: "USER",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);