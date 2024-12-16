import mongoose,{Document,Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../definitions/interfaces';


const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword:string) : Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model<IUser>('User', userSchema);