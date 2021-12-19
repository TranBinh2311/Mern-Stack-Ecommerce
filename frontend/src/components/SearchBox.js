import React, {useState} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const SearchBox = () => {
    const naviagte = useNavigate();
    const [keyword, setKeyword] = useState('')
    const  submitHandler =(e) =>{
         e.preventDefault();
         if(keyword.trim()){
             naviagte(`/search/${keyword}`)
         }
         else{
            naviagte(`/`)
         }
    }
    return (
        <Form onSubmit={submitHandler} style={{maxWidth: '800px'}}>
            <Row>
                <Col>
                    <Form.Control
                    type= "text"
                    name = 'q'
                    onChange={(e)=>  setKeyword(e.target.value) }
                    placeholder='Search Products...'
                    className= 'mr-sm-8 ml-sm-8'
                    ></Form.Control>
                </Col>
                <Col>
                    <Button type = 'submit' variant= "outline-success" className= 'p-2'> Search</Button>
                </Col>
            </Row>    
        </Form>
    )
}

export default SearchBox
