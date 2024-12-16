import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api',authRoutes);

mongoose.connect(process.env.MONGODB_URI as string).then(()=>console.log('connected to MongoDb')).catch(err=>console.error('mongodb connection error',err));

const PORT = process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});