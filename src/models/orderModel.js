import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

const cancelationSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      defeault: Date.now(),
    },
  },
  { _id: false }
);

const returnSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemsSchema],
    totalPrice: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "paypal", "cash_on_delivery"],
      required: true,
    },
    cancellation: cancelationSchema,
    return: returnSchema,
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
