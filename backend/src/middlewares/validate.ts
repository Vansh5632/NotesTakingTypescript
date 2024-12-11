import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const validate = (schema: ZodSchema) => (req:Request,res:Response,next:NextFunction)=>{
    try{
        schema.parse(req.body);
        next();
    }catch(err){

        res.status(400).json({errors: (err as any).errors});
};}

export default validate;