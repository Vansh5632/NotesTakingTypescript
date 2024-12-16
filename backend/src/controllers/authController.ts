import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET||"";
export const signup = async(req:Request,res:Response):Promise<void>=>{
    try{
        const {email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message:'user already exists'});
            return;
        }

        const user = new User({
            email,password
        });
        await user.save();

        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'24h'});
        res.status(201).json({token});
    }catch(error){
        res.status(500).json({message:'Error creating user',error});
    }
};

export const signin = async(req:Request,res:Response) :Promise<void> =>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({message:'Invalid Credentials'});
            return;
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            res.status(401).json({message:'Invalid Credentials'});
            return;
        }

        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'24h'});

        res.json({token});
    }catch(error){
        res.status(500).json({message:'Error signing in',error});
    }
};
