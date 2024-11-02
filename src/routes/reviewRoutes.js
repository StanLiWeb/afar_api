import express from "express";
import {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getAllReviews,
  approveReview,
} from "../controllers/reviewController.js";


const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/all", getAllReviews);
reviewRouter.get("/:slug", getReviewById);
reviewRouter.put("/:id", updateReview);
reviewRouter.put("/approve-request", approveReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
