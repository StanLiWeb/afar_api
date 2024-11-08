import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    description: String,
    slug:{
      type:String,
      unique:true,
    },

    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);
categorySchema.pre("save",async function(next){
  this.slug=slugify(this.name.toLowerCase())
  next();
});
categorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name.toLowerCase());
  }
  next();
});
export const Category = mongoose.model("Category", categorySchema);

