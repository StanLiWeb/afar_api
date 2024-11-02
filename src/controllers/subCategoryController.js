import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import { SubCategory } from "../models/subCategoryModel.js";

//@desc Create a new subcategory
//@router /api/subcategory
//@acces Private
export const createSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newSubCategory = await SubCategory.create(req.body);
    res.status(201).json({ status: true, data: newSubCategory });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Get all subcategorys
//@router /api/subcategory
//@acces Public
export const getAllSubCategorys = expressAsyncHandler(async (req, res) => {
  try {
    const subcategorys = await SubCategory.find();
    res.status(201).json({ status: true, data: subcategorys });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Get a subcategory by slug
//@router /api/subcategory/:slug
//@acces Public
export const getSubCategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: subcategory });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc update a subcategory
//@router /api/subcategory/:id
//@acces Private
export const updateSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!subcategory) {
      throw new AppError("SubCategory no encontrado", 404);
    }
    res.status(201).json({ status: true, data: subcategory });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc delete a subcategory
//@router /api/subcategory/:id
//@acces Private
export const deleteSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      throw new AppError("SubCategory no encontrado", 404);
    }
    res
      .status(201)
      .json({ status: true, message: "SubCategory eliminado con éxito" });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
