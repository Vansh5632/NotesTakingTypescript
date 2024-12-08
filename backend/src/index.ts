import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {connect} from './config/db';

dotenv.config();
const app = express();
connect();


app.post('/api/v1/signup',(req,res)=>{

})

app.post('/api/v1/login',(req,res)=>{

})

app.post('/api/v1/content',(req,res)=>{

})
app.get('/api/v1/content',(req,res)=>{

})
app.delete('/api/v1/content',(req,res)=>{

})

app.post('/api/v1/brain/share',(req,res)=>{

})

app.get('/api/v1/brain/:sharelink',(req,res)=>{
    
})

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})