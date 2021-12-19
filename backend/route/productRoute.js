import express from "express";
// import products from "../data/products";
const router = express.Router();
import {getProducts, getProductById} from '../controllers/controllerProducts.js'


router.get('/' , getProducts);
router.get('/:id' , getProductById);
// router.get('/top' , getTopProducts);
export default router;


