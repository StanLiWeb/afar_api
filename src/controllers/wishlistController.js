import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import { Wishlist } from "../models/wishlistModel.js";

//@desc Create a new wishlist
//@router /api/wishlist
//@acces Private
export const createWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const newWishlist = await Wishlist.create(req.body);
    res.status(201).json({ status: true, data: newWishlist });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Get all wishlists
//@router /api/wishlist
//@acces Public
export const getAllWishlists = expressAsyncHandler(async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.status(201).json({ status: true, data: wishlists });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Get a wishlist by slug
//@router /api/wishlist/:slug
//@acces Public
export const getWishlistById = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    res.status(201).json({ status: true, data: wishlist });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc update a wishlist
//@router /api/wishlist/:id
//@acces Private
export const updateWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!wishlist) {
      throw new AppError("Wishlist no encontrado", 404);
    }
    res.status(201).json({ status: true, data: wishlist });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc delete a wishlist
//@router /api/wishlist/:id
//@acces Private
export const deleteWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlist) {
      throw new AppError("Wishlist no encontrado", 404);
    }
    res
      .status(201)
      .json({ status: true, message: "Wishlist eliminado con éxito" });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
