import mongoose from "mongoose";

const productVariantionSchema = new mongoose.Schema({
  color:{
    type:String,
    required: true,
  },
  size:{
    type:String,
    required: true,
  },
  quantity:{
    type:Number,
    min:0,
    required: true,
  },
  price:{
    type: Number,
    required: true,

  },
});


const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Brand",
      required: true,
    },
    image: [String],
    variations: [productVariantionSchema],
    retingAverage: {
      type: Number,
      default: 0,
    },
    ratinQuantity: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);


export const Product=mongoose.model("Product", productSchema);