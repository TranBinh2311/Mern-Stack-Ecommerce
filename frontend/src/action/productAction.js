import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS ,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

} from '../constants/productConstant'


export const listProduct = () => async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get('/api/products');

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }
    catch(err){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.response && err.response.data.message 
            ? err.response.data.message 
            : err.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/products/${id}`);
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch(err){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message 
            ? err.response.data.message 
            : err.message
        })
    }
}
export const createProductReview = (productId, review) => async (dispatch, getState)=>{
    try{
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST});
        //const {data} = await axios.get('/api/users/login');
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/products/${productId}/reviews`, review,config);

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })
    }
    catch(err){
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: err.response && err.response.data.message 
            ? err.response.data.message 
            : err.message
        })
    }
}