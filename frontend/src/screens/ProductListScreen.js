import React , {useEffect}from 'react'
// import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import  Loader from '../components/Loader'
import  {listProduct, deleteProduct, createProduct} from '../action/productAction'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'
import { useParams } from 'react-router-dom'
import Pageniate from '../components/Pageniate'

const ProductListScreen = () => {
    const {pageNumber} = useParams(); 
    const dispatch = useDispatch();
    const navigate= useNavigate();
  

    const listProducts = useSelector(state => state.productList );
    const {loading , error , products, page, pages} = listProducts;

    const deleteProducts = useSelector(state => state.productDelete );
    const {loading:loadingDelete , error:errorDelete , success: successDelte} =  deleteProducts;

    const createProducts = useSelector(state => state.productCreate );
    const {loading:loadingCreate , error:errorCreate , product: productCreate, success: successCreate} =  createProducts;

    const userLogin = useSelector(state => state.userLogin );
    const {userInfo} = userLogin;

    useEffect(()=>{
        dispatch({type: PRODUCT_CREATE_RESET});

        if( !userInfo.isAdmin){
            navigate('/login')
        }
        if(successCreate){
            navigate(`/admin/product/${productCreate._id}/edit`)
        }
        else{
            dispatch(listProduct('', pageNumber))
        }
    }, [dispatch, navigate, userInfo, successDelte, successCreate, loadingCreate, pageNumber]);
     const createProductHandler = () =>{
        dispatch(createProduct());
     }
    const deleteHandler = (id)=>{
        if(window.confirm('Are you sure')){
          dispatch(deleteProduct(id));
        }   
    }
    return (
        <>
        <Row className='align-items-center'>
            <Col>
            <h1> Products</h1>
            </Col>
            <Col className='text-right' >
                <Button className= 'my-3' onClick={createProductHandler}>
                   <i className='fas fa-plus'></i> Create Products
                </Button>
            </Col>
        </Row>
             {loadingDelete && <Loader/>}
             {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

             {(loadingCreate) && <Loader/>}
             {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            { (loading !== false )? <Loader/> :  error ? <Message variant='danger'>{error}</Message>
            :
            ( 
            <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATAGORY</th>
                            <th>BRAND</th>
                            <th>SELECT</th>
                        </tr>    
                    </thead>
                    <tbody>
                        {products.map(product =>(
                            <tr key = {product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.catagory}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer
                                    to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant = 'danger' className = 'btn-sm' onClick={()=>deleteHandler(product._id)}>
                                        <i  className = 'fas fa-trash' ></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pageniate pages={pages} page={page} isAdmin={true}/>
                </>
            )}  
        </>
    )
}

export default ProductListScreen
