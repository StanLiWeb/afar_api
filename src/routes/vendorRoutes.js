import express from "express";
import {
  createVendor,
  deleteVendor,
  getVendorBySlug,
  getVendors,
  updateVendor,
} from "../controllers/vendorController.js";
import { protect } from "../middleware/authMiddleware.js";

const vendorRouter = express.Router();

//Crear un vendor
vendorRouter.post("/", /*protect*/ createVendor);

//Get vendors route
vendorRouter.get("/all", /*protect*/ getVendors);

//Get vendor by slug route
vendorRouter.get("/:slug", /*protect*/ getVendorBySlug);

//Update vendor by slug route
vendorRouter.put("/:id", /*protect*/ updateVendor);

//Delete vendor by slug route
vendorRouter.delete("/:id", /*protect*/ deleteVendor);

export default vendorRouter;
