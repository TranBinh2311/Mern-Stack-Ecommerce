import express from "express";
import asyncHandler from "express-async-handler";
import Product from '../models/productModel.js';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) =>{

    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyword});
    const products =  await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    // res.status(401)
    // throw new Error('Not Authorize')
    res.json({products, page, pages: Math.ceil(count / pageSize)});
})
// @desc   Fetch single product by Id
// @route  GET
// @access Public
const getProductById = asyncHandler (async (req,res)=>{
    const product =  await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }
    else{
        res.status(404);
        throw new Error('Product not found');
    }
    
})




export  {
    getProducts,
    getProductById
}