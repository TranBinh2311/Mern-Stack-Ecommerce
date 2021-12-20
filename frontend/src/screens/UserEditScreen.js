import React , {useState, useEffect}from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import  Loader from '../components/Loader'
import {getUserDetails, updateUser} from '../action/userAction'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'
import {USER_UPDATE_RESET} from '../constants/userConstant'

const UserEditScreen = () => {

    const {id} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    
    // const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails );
    const {loading, error, user} =  userDetails ;

    const userUpdates = useSelector(state => state.userUpdate );
    const {loading:loadingUpdate, error:errorUpdate, success: successUpdate} =  userUpdates ;
    // const redirect = location.search ?  location.search.split('=')[1] : '/';

    useEffect(()=>{
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET});
            navigate('/admin/userlist')
        }else{
            if(!user.name || user._id !==  id){
                dispatch(getUserDetails(id));
            }else{
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }  
    },[dispatch, id,user._id, user.email, user.isAdmin, user.name, navigate, successUpdate])

    const submitHandler = (e) =>{
        e.preventDefault(); 
        dispatch(updateUser({_id: id, name, email, isAdmin}))       
    }
    return (
        <>
        
            <Link to = '/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>


            <FormContainer>
            <h1> Edit User</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {
            loading ? <Loader/> 
            : error 
            ? <Message variant= 'danger'>{error}</Message>
            :(
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
    
                    <Form.Group controlId = 'isadmin'>
                        <Form.Check
                        style={{ outline: 'none', marginTop: '20px'}}
                        type = "checkbox" 
                        label='Is Admin' 
                        checked= {isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </Form.Group>

                    <Button 
                    style={{ marginTop: '10px'}}
                    type = 'submit' 
                    variant='primary'>Update</Button>
                </Form>
            )}
          
        </FormContainer>
        </>
        
    )
}

export default UserEditScreen
