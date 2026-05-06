import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        enum:["member","admin"],
        default:"member",
    }

},{timestamps:true})


const userModel=mongoose.model("user",userSchema);
export default userModel;