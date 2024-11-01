import mongoose from "mongoose";

const breandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    image: String,
  },
  {
    timestamps: true,
  },
);

export const Brand = mongoose.model("Brand", breandSchema);