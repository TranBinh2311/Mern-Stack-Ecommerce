import express from "express";
import asyncHandler from "express-async-handler";
import Oder from "../models/orderModel.js";
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

// @desc   Get order by ID
// @route  GETT /api/orders
// @access Private
const getOrderById = asyncHandler(async (req, res) =>{
  const order = await Order.findById(req.params.id).populate(
      'user',
       'name email');

  if(order){
      res.json(order);
  }
  else{
      res.status(404);
      throw new Error(`Order not found`)
  }
})

// @desc   Update order to paid
// @route  PUT /api/orders
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id)
  
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult= {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else{
        res.status(404);
        throw new Error(`Order not found`)
    }
  })

// @desc   Get logged user orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) =>{
    const orders = await Order.find({user: req.user._id})
    res.json(orders);
  })

// @desc   Get logged user orders
// @route  GET /api/orders
// @access Private
const getOrders = asyncHandler(async (req, res) =>{
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders);
  })

// @desc   Update order to delivered
// @route  PUT /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id)
  
    if(order){
        order.isDeliverd = true;
        order.deliverAt = Date.now();
        const updatedOrder = await order.save();
        console.log(updatedOrder);
        res.json(updatedOrder);
    }
    else{
        res.status(404);
        throw new Error(`Order not found`)
    }
  })
export {
    addOderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered
}