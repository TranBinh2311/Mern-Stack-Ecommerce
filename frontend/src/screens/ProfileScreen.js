import React , {useState, useEffect}from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button, Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import  Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../action/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant' 


const ProfileScreen = () => {

    //const location = useLocation()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userDetails = useSelector(  (state) => state.userDetails);
    const {loading, error, user} = userDetails;

    const userLogin = useSelector(  (state) => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdateProfile = useSelector( (state) => state.userUpdateProfile);
    const {success} = userUpdateProfile;

    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }
        else{
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'));
            }
            else{     
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[navigate, userInfo, dispatch, user, success])

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword)
        {
            setMessage('Password is not match')
        }
        else{
            setMessage(null)
            dispatch(updateUserProfile({id: user._id, name, email, password}))
            
        }
        
    }
    return (
        <Row>
            <Col md={3}>
            <h1> User Profile</h1>
         
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message> } 
            {success && <Message variant='success'>Successfully!!</Message> } 
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    style={{border: '1px solid #999' , outline: 'none'}}
                    type = "name" 
                    placeholder='Enter your name' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

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

                <Form.Group controlId = 'confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    style={{border: '1px solid #999' , outline: 'none'}}
                    type = "password" 
                    placeholder='Confirm password' 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button 
                style={{ marginTop: '10px'}}
                type = 'submit' 
                variant='primary'>Update</Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Oders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
