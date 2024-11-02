import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";
import {Review} from "../models/reviewModel.js"


//@desc Create a new Review
//@router /api/Review
//@acces Private
export const createReview = expressAsyncHandler(async(req,res)=>{
    try {
        const newReview = await Review.create(req.body);
        res.status(201).json({status:true,data:newReview})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})

//@desc Get all Review
//@router /api/review
//@acces Public
export const getAllReviews = expressAsyncHandler(async(req,res)=>{
    try {
        const reviews = await Review.find();
        res.status(201).json({status:true,data:reviews})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})

//@desc Get a Review by slug
//@router /api/review/:id
//@acces Public
export const getReviewById = expressAsyncHandler(async(req,res)=>{
    try {
        const review = await Review.findOne({id: req.params.id});
        res.status(201).json({status:true,data:review})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})

//@desc update a review
//@router /api/review/:id
//@acces Private
export const updateReview = expressAsyncHandler(async(req,res)=>{
    try {
        const review = await Review.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        });
        if(!review){
            throw new AppError("Review no encontrado",404)
        }
        res.status(201).json({status:true,data:review})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})


//@desc delete a review
//@router /api/review/:id
//@acces Private
export const deleteReview = expressAsyncHandler(async(req,res)=>{
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if(!review){
            throw new AppError("Review no encontrado",404)
        }
        res.status(201).json({status:true, message:"Review eliminado con éxito"})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})

//@desc Update is approved
//@router /api/review/approve-request
//@acces Private
export const approveReview = expressAsyncHandler(async(req,res)=>{
    try {
        const review = await Review.findByIdAndUpdate(req.params.id,{isApproved: req.body.isApproved},{new: true});
        if(!review){
            throw new AppError("Review no encontrado",404)
        }
        res.status(201).json({status:true, message:"Review update con éxito"})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})