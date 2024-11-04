import {Order} from "../models/orderModel.js"
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middleware/errorHandler.js";

//@desc Create a new Order
//@router /api/order/
//@acces Private
export const createOrder = expressAsyncHandler(async(req, res) => {
    try {
        const order= new Order(req.body);
        await order.save();
        res.status(200).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
} );

//@desc Get all Order
//@router /api/order/
//@acces Private
export const getAllOrders = expressAsyncHandler(async(req, res) => {
    try {
        const order= await Order.find().populate("user items.product");
        await order.save();
        res.status(200).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
} );

//@desc Get a Order
//@router /api/order/
//@acces Private
export const getOrder = expressAsyncHandler(async(req, res) => {
    try {
        const order= await Order.findById(req.params.id).populate("user items.product");
        res.status(200).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
} );

//@desc Update a Order
//@router /api/order/
//@acces Private
export const updateOrder = expressAsyncHandler(async(req, res) => {
    try {
        const order= await Order.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
        });
        if(!order){
            return res.status(400).json({status:false,message:"Orden no encontrada"})
        }
        res.status(200).json({status:true,data:order})
    } catch (error) {
        throw new AppError(error)
    }
} );


//@desc Delete a Order
//@router /api/order/
//@acces Private
export const deleteOrder = expressAsyncHandler(async(req, res) => {
    try {
        const order= await Order.findByIdAndDelete(req.params.id, req.body,{
            new:true,
        });
        if(!order){
            return res.status(400).json({status:false,message:"Orden no encontrada"})
        }
        res.status(200).json({status:true, message:"Orden eliminado con éxito"})
    } catch (error) {
        throw new AppError(error)
    }
} );

//@desc Delete a Order status
//@router /api/order/
//@acces Private
export const updateOrderStatus = expressAsyncHandler(async(req, res) => {
    try {
        const{status}=req.body;
        const order= await Order.findByIdAndUpdate(req.params.id,{status},{new:true});
        if(!order){
            return res.status(400).json({status:false,message:"Orden no encontrada"})
        }
        res.status(200).json({status:true, message:"Orden eliminado con éxito"})
    } catch (error) {
        throw new AppError(error)
    }
} );

//@desc Handler order cancellation
//@router /api/order/
//@acces Private
export const handlerOrderCancellation = expressAsyncHandler(async(req, res) => {
    try {
        const{reason}=req.body;
        const order= await Order.findByIdAndUpdate(req.params.id,{status:"cancelled",cancellation:{reason, createdAt:Date.now()}},{new:true});
        if(!order){
            return res.status(400).json({status:false,message:"Orden no encontrada"})
        }
        res.status(200).json({status:true, message:"Orden eliminado con éxito"})
    } catch (error) {
        throw new AppError(error)
    }
} );

//@desc Handler order return
//@router /api/order/
//@acces Private
export const handlerOrderReturn = expressAsyncHandler(async(req, res) => {
    try {
        const{reason}=req.body;
        const order= await Order.findByIdAndUpdate(req.params.id,{return:{reason, status:"pending", createdAt: new Date()}},{new:true});
        if(!order){
            return res.status(400).json({status:false,message:"Orden no encontrada"})
        }
        res.status(200).json({status:true, message:"Orden eliminado con éxito"})
    } catch (error) {
        throw new AppError(error)
    }
} );

//@desc Handler order return
//@router /api/order/
//@acces Private
export const handlerOrderStatus = expressAsyncHandler(async(req, res) => {
    try {
        const{status}=req.body;
        const order= await Order.findOneAndUpdate({_id:req.params.id, "return.status":"pending"},{"return.status":status},{new:true});
        if(!order){
            return res.status(400).json({status:false,message:"Orden no encontrada o ya ha sido procesada"})
        }
        res.status(200).json({status:true, message:"Orden eliminado con éxito"})
    } catch (error) {
        throw new AppError(error)
    }
} );