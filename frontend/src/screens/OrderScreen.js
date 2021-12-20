
import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row, Col , ListGroup, Image, Card, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, deliverOrder } from '../action/orderAction'
import { ORDER_DELIVERED_RESET } from '../constants/orderConstant'

const OrderScreen = () => {
    const {id} = useParams();
    console.log(id);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
   
    const orderDetails= useSelector(state => state.orderDetails);
    const {order, error, loading} = orderDetails;

    const userLogin= useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const orderDeliverys = useSelector(state => state.orderDeliver);
    const {loading: loadingDeliver, success: successDeliver} = orderDeliverys ;

    
    if(!loading){
        order.itemsPrice =  Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty,0).toFixed(2))
    }
    useEffect(()=>{     
        if(!order || order._id !== id || successDeliver )     
        {
            dispatch({type: ORDER_DELIVERED_RESET})
            dispatch(getOrderDetails(id))
        }
    },[order, id, dispatch, successDeliver])

    const deliverHandler = ()=>{
        dispatch(deliverOrder(order));
    }
    return loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> 
    :(
        <>
             <h1> Order code: {order._id}</h1>
             <Row>
                <Col md = {8}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong> <a href = {`mailto: ${order.user.email}`}> {order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddrees.address},
                                {order.shippingAddrees.city}{' '},
                                {/* {order.shippingAddrees.postalCode},{' '} */}
                                {order.shippingAddrees.country}
                            </p>
                            <p>
                               {order.isDeliverd? <Message variant='success'>Delivered on {order.deliverAt}</Message>
                               : <Message variant='danger'>Not Delivered</Message> }
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            <p>
                               {order.isPaid? <Message variant='success'>Paid on {order.paidAt}</Message>
                               : <Message variant='danger'>Not Paid</Message> }
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            { order.orderItems.length === 0 ? <Message>Your cart is Empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => 
                                        (<ListGroup.Item key = {index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md= {4}>
                                                    {item.qty} x ${item.price} = {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Sumary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            { loadingDeliver && <Loader/>}
                            {
                                userInfo.isAdmin && !order.isDeliverd && (
                                    <ListGroup.Item>
                                        <Button 
                                        type='button' 
                                        className='btn btn-block' 
                                        onClick={deliverHandler}>
                                            Mark as Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen
