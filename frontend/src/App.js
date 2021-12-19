import React from  'react';
import Footer from './components/Footer';
import Header from './components/Header';
import {Container} from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import About from './screens/About';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceorderScreen from './screens/PlaceorderScreen';
const  App= () => {
  return (
    <Router>
        <Header/>
            <main className='py-3'>
              <Container>
                <Routes>
                  <Route path= '/search/:keyword' element = {<HomeScreen/>} />
                  <Route path= "/" element = {<HomeScreen/>} exact />
                  
                  <Route path= "/login" element = {<LoginScreen/>} exact /> 
                  <Route path= "/register" element = {<RegisterScreen/>} exact /> 
                  <Route path= "/product/:id" element = {<ProductScreen/>}/>
                  <Route path= '/cart/:id' element = {<CartScreen/>}/>
                  <Route path= '/cart' element = {<CartScreen/>} />
                  <Route path= '/profile' element = {<ProfileScreen/>} />
                  <Route path= '/about' element = {<About/>} />
                  <Route path= '/shipping' element = {<ShippingScreen/>} />
                  <Route path= '/payment' element = {<PaymentScreen/>} />
                  
                  <Route path= '/placeorder' element = {<PlaceorderScreen/>} />
                </Routes>
              </Container>
              {/* <div className='container'>
                <video src = "/video/bg-video.mp4" autoPlay muted loop></video>
              </div> */}
            </main>
        <Footer/>
    </Router>
  
  );
}

export default App;
