import express from "express";
// import products from "../data/products";
const router = express.Router();
import {authUser, getUserProfile, registerUser, updateUser} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'


router.post('/' , registerUser);
router.post('/login' , authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser);

export default router;


