import {Request,Response,NextFunction} from 'express';
import jwt, { decode } from 'jsonwebtoken';
import { AuthRequest } from '../definitions/interfaces';

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authenticateToken = async(
    req:AuthRequest,
    res:Response,
    next:NextFunction
):Promise<void> =>{
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if(!token){
            res.status(401).json({message:'Authentication required'});
            return;
        }

        const decoded = jwt.verify(token,JWT_SECRET) as {userId:string};
        req.userId = decoded.userId;
        next();
    }catch(error){
        res.status(403).json({message:'Invalid token'});
    }


}
