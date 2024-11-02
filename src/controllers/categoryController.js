import expressAsyncHandler from "express-async-handler";
import { Category } from "../models/CategoryModel.js";
import { AppError } from "../middleware/errorHandler.js";

//@desc Create a new category
//@router /api/category
//@acces Private
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({ status: true, data: newCategory });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Get all categorys
//@router /api/category
//@acces Public
export const getAllCategorys = expressAsyncHandler(async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(201).json({ status: true, data: categorys });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Get a category by slug
//@router /api/category/:slug
//@acces Public
export const getCategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(201).json({ status: true, data: category });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc update a category
//@router /api/category/:id
//@acces Private
export const updateCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      throw new AppError("Category no encontrado", 404);
    }
    res.status(201).json({ status: true, data: category });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc delete a category
//@router /api/category/:id
//@acces Private
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      throw new AppError("Category no encontrado", 404);
    }
    res
      .status(201)
      .json({ status: true, message: "Category eliminado con éxito" });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
