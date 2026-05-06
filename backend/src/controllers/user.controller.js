import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";


export const signup=async(req,res)=>{
    const {name,email,password,role}=req.body;

    try{

        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        const newUser=await User.create({name,email,password:hashPassword,role});
        const token=generateToken(newUser._id);

        return res.cookie("authToken",token,{
        httpOnly:true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,  
        path: "/",
        })
        .status(200).json({
        success:true,
        message:"Signup Successfully!" ,
        data:newUser,
    });
    }

    catch(error){
        console.log(error);
        if(error.code===11000){
            return res.status(409).json({
                success:false,
                message:"User already exists!"});
        }
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        })
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const isUserExist= await User.findOne({email});
        if(!isUserExist) return res.status(404).json({
            success:false,
            message:"User not found, Signup now!"
        });

        const isPasswordCorrect=await bcrypt.compare(password,isUserExist.password);
        if(!isPasswordCorrect) return res.status(400).json({
            status:false,
            message:"Password is incorrect."
        });

        const token=generateToken(isUserExist._id);

        return res.cookie("authToken",token,{
        httpOnly:true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,  
        path:"/"
        })
        .status(200).json({
            success:true,
            message:"Login Successfully!",
            data:{_id:isUserExist._id,name:isUserExist.name,role:isUserExist.role},
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        })
    }
   
}

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export const logout = (req, res) => {
  res.clearCookie("authToken", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

