
import React , {useState}from 'react'
import { useNavigate} from 'react-router-dom'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import CheckoutStep from '../components/CheckoutStep'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../action/cartActions'

const PaymentScreen = () => {

    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if(!shippingAddress){
        navigate.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');


    const dispatch = useDispatch()
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod (paymentMethod));
        navigate('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit = {submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                
                <Col>
                    <Form.Check 
                    type= 'radio' 
                    label= 'PayPal or Credit Card' 
                    id ='PayPal'
                    name = 'paymentMethod'
                    value ='PayPal'
                    checked
                    onChange={ (e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
               
                    <Form.Check 
                    type= 'radio' 
                    label= 'Stripe' 
                    id ='Stripe'
                    name = 'paymentMethod'
                    value ='Stripe'
                    onChange={ (e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
                
                <Button type = 'submit' variant='primary' style={{marginTop: '15px' , marginRight: '0'}}>
                    Continue
                </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen 
