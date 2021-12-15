import mongoose from 'mongoose'

const connectDB  = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
        });

        console.log('MongoDB connected!!!'.cyan.underline);
    }
    catch(err){
        console.log(err.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB;