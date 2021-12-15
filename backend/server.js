import express from 'express'
import products from './data/products.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import colors from 'colors'
import productRouter from './route/productRoute.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000


app.get('/' ,(req,res)=>{
    res.send("API is running ...")
})

app.use('/api/products', productRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log("Listening in port : " + port);
})

