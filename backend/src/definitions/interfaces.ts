import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document{
    email:string;
    password:string;
    comparePassword: (password:string) => Promise<boolean>;
}

export interface AuthRequest extends Request{
    userId:string;
}