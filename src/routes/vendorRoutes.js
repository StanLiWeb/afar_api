import express from "express";
import { createVendor, getVendors } from "../controllers/vendorController.js";
import { protect } from "../middleware/authMiddleware.js";

const vendorRouter = express.Router();

//Crear un vendor

vendorRouter.post("/", /*protect*/ createVendor);

//Get vendors route
vendorRouter.get("/all", /*protect*/ getVendors);

export default vendorRouter;
