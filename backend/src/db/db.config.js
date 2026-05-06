import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB=async()=>{

    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        .then((res)=>{console.log("Connected DB")})
    }
    catch(error){
        console.log(`Error : ${error.message}`)
        process.exit(1);
    }
    
}
export default connectDB;