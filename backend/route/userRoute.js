import express from "express";
// import products from "../data/products";
const router = express.Router();
import {
    authUser, 
    deletUserById,
    getUserProfile,
    getUsers, 
    registerUser, 
    updateUser,
    updateUserById,
    getUserById} from '../controllers/userController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'


router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login' , authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUser);
router.route('/:id')
.delete(protect, isAdmin, deletUserById)
.get(protect, isAdmin, getUserById)
.put(protect,isAdmin, updateUserById)
export default router;


