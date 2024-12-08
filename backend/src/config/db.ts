import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect = async()=>{
    try{
        await mongoose.connect('process.env.MONGODB_URL');
        console.log('database connected');
    }catch(error){
        console.log('database connection failed');
        process.exit(1)
    }
}