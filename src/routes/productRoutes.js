import express from "express";
import {
  createProduct,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/all", getAllProducts);
productRouter.get("/:slug", getProductBySlug);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
