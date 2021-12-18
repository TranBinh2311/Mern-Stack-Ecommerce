import React , {useState, useEffect}from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import  Loader from '../components/Loader'
import {login} from '../action/userAction'
import FormContainer from '../components/FormContainer'


const LoginScreen = () => {

    const location = useLocation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin;


    const redirect = location.search ?  location.search.split('=')[1] : ' ';

    useEffect(()=>{
        if(userInfo){
           navigate(`/${redirect}`)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1> Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    style={{border: '1px solid #999' , outline: 'none'}}
                    type = "email" 
                    placeholder='Enter your email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId = 'password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    style={{border: '1px solid #999' , outline: 'none'}}
                    type = "password" 
                    placeholder='Enter your password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button 
                style={{ marginTop: '10px'}}
                type = 'submit' 
                variant='primary'>Sign In</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                New Custommer? <Link to= {redirect ? `/register?redirect=${redirect}` : '/register' } >Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
