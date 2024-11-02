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
    throw new AppError(error, 400);
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
    throw new AppError(error, 400);
  }
});

//@desc get vendor by slug
//@router /api/vendor/:slug
//@acces Public
export const getVendorBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findOne({slug:req.params.slug}).populate("user","-password");
    res.status(201).json({ status: true, data: vendor });
  } catch (error) {
    throw new AppError(error, 400);
  }
});


//@desc update vendor by slug
//@router /api/vendor/:id
//@acces Public
export const updateVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if(!vendor){
      throw new AppError("Vendor no encontrado", 404);
    }
    res.status(201).json({ status: true, data: vendor });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc delete vendor 
//@router /api/vendor/:id
//@acces Public
export const deleteVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id)
    if(!vendor){
      throw new AppError("Vendor no encontrado", 404);
    }
    //res.status(201).json({ status: true, data: vendor });
    res.status(201).json({ status: true, message: "Vendor eliminado" });
  } catch (error) {
    throw new AppError(error, 400);
  }
});