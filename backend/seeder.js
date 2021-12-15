import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Oder from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () =>{
    try{
        await Oder.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

       const createUsers =  await User.insertMany(users)

        const adminUser = createUsers[0]._id;

        const sampleProducts = products.map(product =>{
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported'.green.inverse);
        process.exit();
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

const destroyData = async () =>{
    try{
        await Oder.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();


        console.log('Data Destroyed'.green.inverse);
        process.exit();
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}
else{
    importData();
}