import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import {Vendor}from "../models/vendorModel.js";


//@desc Register new vendor
//@router /api/vendor
//@acces Private
export const createVendor = expressAsyncHandler(async (req, res) => {
  try {
    const newVendor = await Vendor.create(req.body);
    res.status(201).json({ status: true, data: newVendor });
  } catch (error) {
    throw new AppError("Error al crear el usuario", 400);
  }
});

//@desc get vendors
//@router /api/vendors
//@acces Public
export const getVendors = expressAsyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("user");
    res.status(201).json({ status: true, data: vendors });
  } catch (error) {
    throw new AppError("Error al crear el usuario", 400);
  }
});
