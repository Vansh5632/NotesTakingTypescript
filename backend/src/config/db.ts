import mongoose from "mongoose";


const MongoUrl = "mongodb+srv://vanshgilhotra8885:UxNn2CLj9qOawJdf@cluster0.kmpao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
export const connect = async()=>{
    try{
        await mongoose.connect(MongoUrl);
        console.log('database connected');
    }catch(error){
        console.log('database connection failed');
        process.exit(1)
    }
}