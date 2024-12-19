import { Document } from "mongoose";
import { Request } from "express";
import mongoose from "mongoose";

export interface IUser extends Document{
    email:string;
    password:string;
    comparePassword: (password:string) => Promise<boolean>;
}

export interface AuthRequest extends Request{
    userId:string;
}

export interface INote extends Document{
    userId:mongoose.Types.ObjectId;
    title:string;
    content:string;
    tags:string[];
    isPinned:boolean;
    isArchived:boolean;
    createdAt:Date;
    updatedAt:Date;
}

