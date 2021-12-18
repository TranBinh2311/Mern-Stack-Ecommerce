import express from "express";
// import products from "../data/products";
const router = express.Router();
import {addOderItems} from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOderItems);

export default router;


