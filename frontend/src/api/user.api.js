
import axios from "axios";
const USER_API_END_POINT=import.meta.env.VITE_USER_API;

export const signupUser=async(data)=>{
    try{
        const res=await axios.post(`${USER_API_END_POINT}/signup`,
            data,
            {withCredentials:true});
        return res.data;
    }

    catch(error){
        return error.response?.data;
}
}

export const loginUser=async(data)=>{
    try{
        const res=await axios.post(`${USER_API_END_POINT}/login`,
            data,
            {withCredentials:true});
        
        return res.data;
    }

    catch(error){
        return error.response?.data;
}
}



export const logoutUser=async()=>{

    try{
        const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
        return res.data;
    }

    catch(error){
        return error.response?.data;
    
    }
}

