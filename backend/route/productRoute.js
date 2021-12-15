import express from "express";
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
// import products from "../data/products";
const router = express.Router();

// @desc   Fetch all products
// @route  GET
// @access Public
router.get('/' ,asyncHandler (async (req,res)=>{
    const products =  await Product.find({});
    // res.status(401)
    // throw new Error('Not Authorize')
    res.json(products)
}))
// @desc   Fetch single product by Id
// @route  GET
// @access Public
router.get('/:id' ,asyncHandler (async (req,res)=>{
    const product =  await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }
    else{
        res.status(404);
        throw new Error('Product not found');
    }
    
}));
export default router;


