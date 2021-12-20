import express from "express";
// import products from "../data/products";
const router = express.Router();
import {getProducts, getProductById, getTopPoducts, deletePoducts, updatePoducts, createPoducts} from '../controllers/controllerProducts.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, isAdmin, createPoducts);
router.get('/top' , getTopPoducts);
router.route('/:id')
.get(getProductById)
.delete(protect, isAdmin, deletePoducts)
.put(protect, isAdmin, updatePoducts);


export default router;


