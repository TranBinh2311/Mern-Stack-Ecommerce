import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    
} from '../constants/orderConstant'
import axios from 'axios'

export const  createOrder = (order) => async (dispatch, getState)=>{
    try{
        dispatch({type: ORDER_CREATE_REQUEST});
        //const {data} = await axios.get('/api/users/login');
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            `/api/orders`, 
            order,
            config
        );
        console.log(data);
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    }
    catch(err){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message 
            ? err.response.data.message 
            : err.message
        })
    }
}
