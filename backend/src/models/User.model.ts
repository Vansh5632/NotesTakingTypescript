import mongoose,{Schema,Document} from "mongoose";
import {z} from "zod";

export const UserZodSchema = z.object({
    email:z.string().email(),
    password:z.string().min(8)
});

export type IUserZod = z.infer<typeof UserZodSchema>;

export interface IUser extends Document,IUserZod{}



const UserSchema = new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
});

export const User = mongoose.model<IUser>('User',UserSchema);

