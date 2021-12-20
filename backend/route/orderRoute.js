import express from "express";
// import products from "../data/products";
const router = express.Router();
import {addOderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered} from '../controllers/orderController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOderItems).get(protect,isAdmin,  getOrders);;
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect,isAdmin, updateOrderToDelivered);

export default router;


