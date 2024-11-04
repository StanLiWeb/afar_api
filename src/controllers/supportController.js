import {Support} from "../models/supportSchema.js"
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";

//@desc Create a new support
//@router /api/order/
//@acces Private
export const createSupport = expressAsyncHandler(async(req, res) => {
    try {
        const support = new Support(req.body);
        await support.save();
        res.status(200).json({status:true,data:support})
    } catch (error) {
        throw new AppError(error)
    }
} );


//@desc Create all supports
//@router /api/order/
//@acces Private
export const getAllSupports = expressAsyncHandler(async(req, res) => {
    try {
        const support = await Support.find().populate("user product assignedTo assignedBy");
        res.status(200).json({status:true,data:support})
    } catch (error) {
        throw new AppError(error)
    }
} );


//@desc get support by id
//@router /api/order/
//@acces Private
export const getSupportById = expressAsyncHandler(async(req, res) => {
    try {
        const support = await Support.findById(req.params.id).populate("user product assignedTo assignedBy");
        if(!support){
            return res.status(404).json({status:false,message:"Soporte no encontrado"})
        }
        res.status(200).json({status:true,data:support})
    } catch (error) {
        throw new AppError(error)
    }
});

//@desc update support
//@router /api/order/
//@acces Private
export const updateSupportById = expressAsyncHandler(async(req, res) => {
    try {
        const support = await Support.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
        }).populate("user product assignedTo assignedBy");
        if(!support){
            return res.status(404).json({status:false,message:"Soporte no encontrado"})
        }
        res.status(200).json({status:true,data:support})
    } catch (error) {
        throw new AppError(error)
    }
} );

//@desc delete support
//@router /api/order/
//@acces Private
export const deleteSupportById = expressAsyncHandler(async(req, res) => {
    try {
        const support = await Support.findByIdAndDelete(req.params.id, req.body,{
            new:true,
        }).populate("user product assignedTo assignedBy");
        if(!support){
            return res.status(404).json({status:false,message:"Soporte no encontrado"})
        }
        res.status(200).json({status:true,messege:"Soporte eliminado con éxito"})
    } catch (error) {
        throw new AppError(error)
    }
} );

//@desc Assign support
//@router /api/order/
//@acces Private
export const assignSupport = expressAsyncHandler(async(req, res) => {
    try {
        const{assignedTo, assignedBy}=req.body
        const support = await Support.findByIdAndUpdate(req.params.id, {assignedTo, assignedBy},{
            new:true,
        }).populate("user product assignedTo assignedBy");
        if(!support){
            return res.status(404).json({status:false,message:"Soporte no encontrado"})
        }
        res.status(200).json({status:true,data:suppport})
    } catch (error) {
        throw new AppError(error)
    }
} );


//@desc update support status
//@router /api/order/
//@acces Private
export const updateSupportStatus = expressAsyncHandler(async(req, res) => {
    try {
        const{status}=req.body
        const support = await Support.findByIdAndUpdate(req.params.id, {status},{
            new:true,
        }).populate("user product assignedTo assignedBy");
        if(!support){
            return res.status(404).json({status:false,message:"Soporte no encontrado"})
        }
        res.status(200).json({status:true,data:suppport})
    } catch (error) {
        throw new AppError(error)
    }
} );