import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {connect} from './config/db';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';

dotenv.config();
const app = express();
connect();


app.use(express.json());
app.use(cookieParser());

app.use('/api/signup',userRoutes);


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})