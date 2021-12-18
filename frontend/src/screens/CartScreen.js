import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button , Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../action/cartActions'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const CartScreen = () => {

    const {id} = useParams();
    const location = useLocation()
    const qty = location.search? Number(location.search.split('=')[1]) : 1;
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate();
    const { cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])
 

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id));
    }

    const checkoutHandle = () =>{
        navigate(`/login?redirect=shipping`);
    }

    return (
        <Row>
            <Col md = {8}>
                <h1>Shoping Cart</h1>
                {
                    cartItems.length === 0 
                    ? <Message>
                        Your cart is empty <Link to='/'><span style={{color: "#000"}}>Go Back</span></Link>
                    </Message>
                    : (
                        <ListGroup variant='flush'>
                            {cartItems.map( (item, index) => (
                                <ListGroup.Item key = {index}>
                                    <Row>
                                        <Col md ={2}>
                                            <Image src= {item.image} alt ={item.name} fluid rounded key = {item.id}/>
                                        </Col>
                                        <Col md= {3}>
                                            <Link key = {item.id} to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md= {2}>${item.price}</Col>
                                        <Col md= {2}>
                                            <Form.Control 
                                                as='select' 
                                                value = {item.qty} 
                                                onChange={(e)=> dispatch(addToCart(item.product, 
                                                Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key= {x + 1 } value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        ))
                                                    }                      
                                            </Form.Control>
                                        </Col>

                                        <Col md = {2}>
                                            <Button 
                                            key = {item.id}
                                            type= 'button' 
                                            variant ='light' 
                                            onClick = {()=>removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))
                            }
                        </ListGroup>
                    )
                }
            </Col>

            <Col md = {4}>
                <h1 style={{color: 'transparent'}}>TOTAL</h1>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2> Subtotal ( {cartItems.reduce((acc,item)=> acc + item.qty, 0)} ) items</h2>
                            ${cartItems.reduce((acc, item)=> acc + item.qty * item.price,0).toFixed(2)}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                            type = 'button'
                            className='btn-clock'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandle}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

            <Col md = {2}>
            </Col>
        </Row>
    )
}

export default CartScreen
