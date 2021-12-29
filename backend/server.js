import express from 'express'
import products from './data/products.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import colors from 'colors'
import productRouter from './route/productRoute.js'
import userRouter from './route/userRoute.js'
import orderRouter from './route/orderRoute.js'
import uploadRouter from './route/uploadRoute.js'
import morgan from 'morgan';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import * as path from 'path';


dotenv.config();
connectDB();
const app = express();
if(process.env.NODE_ENV === "developement"){
    app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRouter);
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter);
app.use('/api/upload', uploadRouter);


const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}else{
    app.get('/' ,(req,res)=>{
        res.send("API is running ...")
    })
}

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
}


app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Listening in port : " + port);
})

