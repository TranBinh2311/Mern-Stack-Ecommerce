import React , {useEffect}from 'react'
// import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import  Loader from '../components/Loader'
import  {listOrder} from '../action/orderAction'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

// import { useParams } from 'react-router-dom'

const OrderListScreen = () => {

    const dispatch = useDispatch();
    const navigate= useNavigate();
    // const {id} = useParams();

    const listOders = useSelector(state => state.orderList );
    const {loading , error , orders} = listOders;

    const userLogin = useSelector(state => state.userLogin );
    const {userInfo} = userLogin;

    useEffect(()=>{
        if( !userInfo.isAdmin){
            navigate('/login')
        }
        else{
            dispatch(listOrder())
        }
    }, [dispatch, navigate, userInfo]);
    //  const createProductHandler = () =>{
    //     dispatch(createProduct());
    //  }
    return (
        <>
            { (loading !== false )
            ? <Loader/> 
            :  error 
            ? <Message variant='danger'>{error}</Message>
            :( 
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>    
                    </thead>
                    <tbody>
                        { orders.map(order =>(
                            <tr key = {order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{
                                    order.createdAt.substring(0,10)
                                }</td>
                                <td>{
                                    order.totalPrice
                                    }</td>
                                <td>
                                    { order.isPaid ? order.paidAt.substring(0,10) 
                                    :(<i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}
                                </td>
                                <td>
                                    { order.isDeliverd ? order.deliverAt.substring(0,10) 
                                    :(<i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                    to={`/order/${order._id}`}
                                    >
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}  
        </>
    )
}

export default OrderListScreen
