import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from  'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer ,productReviewReducer, productTopReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import {
    userLoginReducer,
    userRegisterReducer,
    userDatailReducer, 
    userUpdateProfileReducer , 
    userListReducer,
    userDeleteByIdReducer ,
    userUpdateReducer
} 
from './reducers/userReducer' 
import {orderCreateReducer, orderDetailsReducer ,orderUpdatePaidReducer, orderListMyReducer} from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReview: productReviewReducer,
    productTop: productTopReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails : userDatailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList:  userListReducer,
    deleteUserById: userDeleteByIdReducer ,
    userUpdate:  userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderUpdatePaidReducer,
    orderMyList: orderListMyReducer
}) 
const cartItemFormStorage = localStorage.getItem('cartItems') ? JSON.parse(
    localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(
    localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(
    localStorage.getItem('shippingAddress')) : []

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(
    localStorage.getItem('paymentMethod')) : []

const initialState = {
    cart: {
        cartItems: cartItemFormStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: {userInfo: userInfoFromStorage},
}
const middleware = [thunk]
const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;