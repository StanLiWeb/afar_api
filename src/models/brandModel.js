import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    slug:{
      type:String,
      unique:true,
    },
    image: String,
  },
  {
    timestamps: true,
  },
);

brandSchema.pre("save",async function(next){
  this.slug=slugify(this.name.toLowerCase())
  next();
});
brandSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name.toLowerCase());
  }
  next();
});

export const Brand = mongoose.model("Brand", brandSchema);