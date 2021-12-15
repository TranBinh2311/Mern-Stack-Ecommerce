import React from  'react';
import Footer from './components/Footer';
import Header from './components/Header';
import {Container} from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import About from './screens/About';
const  App= () => {
  return (
    <Router>
        <Header/>
            <main className='py-3'>
              <Container>
                <Routes>
                  <Route path= "/" element = {<HomeScreen/>} exact />
                  {/* <Route path= "/cart" element = {<HomeScreen/>} exact />
                  <Route path= "/login" element = {<HomeScreen/>} exact /> */}
                  <Route path= "/product/:id" element = {<ProductScreen/>}/>
                  <Route path= '/cart/:id' element = {<CartScreen/>}/>
                  <Route path= '/cart' element = {<CartScreen/>} />
                  <Route path= '/about' element = {<About/>} />
                </Routes>
              </Container>
              <div className='container'>
                <video src = "/video/bg-video.mp4" autoPlay muted loop></video>
              </div>
            </main>
        <Footer/>
    </Router>
  
  );
}

export default App;
