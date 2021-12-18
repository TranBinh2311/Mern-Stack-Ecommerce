
import React , {useState}from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Row, Col , ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import CheckoutStep from '../components/CheckoutStep'
import Message from '../components/Message'
import { saveShippingAdress , shippingAdress} from '../action/cartActions'

const PlaceorderScreen = () => {
    const cart = useSelector(state => state.cart)

    return (
        <>
             <CheckoutStep step1 step2 step3 step4/>
             <Row>
                <Col md = {8}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAdress.address},{cart.shippingAdress.city}{' '},
                                {cart.shippingAdress.postalCode},{' '}
                                {cart.shippingAdress.country}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </>
    )
}

export default PlaceorderScreen
