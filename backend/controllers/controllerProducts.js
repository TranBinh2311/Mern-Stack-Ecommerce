import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Product from '../models/productModel.js';

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) =>{

    const pageSize = 10;
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

// @desc   Fetch top products by Id
// @route  GET
// @access Public
const getTopPoducts = asyncHandler (async (req,res)=>{
    const products =  await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products);  
})


// @desc   Delete product by Id
// @route  Delete
// @access Private Admin
const deletePoducts = asyncHandler (async (req,res)=>{
    const product =  await Product.findById(req.params.id);
    if(product){
        await product.remove();
        res.json({message: "Product removed"});
    }
    else{
        res.status(404);
        throw new Error(`Product not found`)
    }
})

// @desc   Create product by Id
// @route   POST api/products
// @access Private Admin
const createPoducts = asyncHandler (async (req,res)=>{
    const product = new Product({
        name: 'asd',
        price: 0,
        user: req.user._id,
        image: 'asd',
        brand: "asd",
        category: "asd",
        countInStock: 0,
        numReviews: 0,
        description: "asd"
    });

    const createdProduct = await product.save()
    res.status(201).json( createdProduct);
})


// @desc   Update product by Id
// @route   PUT api/products/:id
// @access Private Admin
const updatePoducts = asyncHandler (async (req,res)=>{
    const {name, price, description, image, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand =brand;
        product.category = category;
        product.countInStock = countInStock;


        const updatedProduct = await product.save()
        res.json(updatedProduct );
    }else{
        res.status(404)
        throw new Error(`Product not found`)
    }
})




export  {
    getProducts,
    getProductById,
    getTopPoducts,
    deletePoducts ,
    createPoducts,
    updatePoducts
}