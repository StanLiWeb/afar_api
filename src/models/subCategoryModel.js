import mongoose from "mongoose";
import slugify from "slugify";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    slug: String,
  },
  {
    timestamps: true,
  }
);
subCategorySchema.pre("save", async function (next) {
  this.slug = slugify(this.name.toLowerCase());
  next();
});
subCategorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name.toLowerCase());
  }
  next();
});
export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
