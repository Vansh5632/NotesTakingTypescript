import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authenticate = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        req.body.userId = (decoded as any).userId;
        next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }
}