import expressAsyncHandler from "express-async-handler";
import{Product} from "../models/productModel.js";
import { AppError } from "../middleware/errorHandler.js";


//@desc Create a new product
//@router /api/product
//@acces Private
export const createProduct = expressAsyncHandler(async(req,res)=>{
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({status:true,data:newProduct})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})

//@desc Get all products
//@router /api/product
//@acces Public
export const getAllProducts = expressAsyncHandler(async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(201).json({status:true,data:products})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})

//@desc Get a product by slug
//@router /api/product/:slug
//@acces Public
export const getProductBySlug = expressAsyncHandler(async(req,res)=>{
    try {
        const product = await Product.findOne({slug: req.params.slug});
        res.status(201).json({status:true,data:product})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})

//@desc update a product
//@router /api/product/:id
//@acces Private
export const updateProduct = expressAsyncHandler(async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        });
        if(!product){
            throw new AppError("Producto no encontrado",404)
        }
        res.status(201).json({status:true,data:product})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})


//@desc delete a product
//@router /api/product/:id
//@acces Private
export const deleteProduct = expressAsyncHandler(async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            throw new AppError("Producto no encontrado",404)
        }
        res.status(201).json({status:true, message:"Producto eliminado con éxito"})
    } catch (error) {
        throw new AppError(error,400)
    
    }
})