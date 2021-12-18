import express from "express";
import asyncHandler from "express-async-handler";
import Order from '../models/orderModel.js';

// @desc   Create new order
// @route  POST /api/orders
// @access Public
const addOderItems = asyncHandler(async (req, res) =>{
    const {
        orderItems,
        shippingAddrees,
        paymentMethod, 
        itemsPrice,
        taxPrice,
        shippingPrice, 
        totalPrice
    } =  req.body;

    if(orderItems && orderItems.length === 0){
        res.status(404);
        throw new Error('No oders items')
    } 
    else{
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddrees,
            paymentMethod, 
            itemsPrice,
            taxPrice,
            shippingPrice, 
            totalPrice
        })

        const createOrder = await order.save();
        res.status(201).json(createOrder );
    }
})

export {
    addOderItems
}