
import axios from "axios";
const TASK_API_END_POINT=import.meta.env.VITE_TASK_API;

export const updateTask=async(id,data)=>{
    try{
        const res=await axios.patch(`${TASK_API_END_POINT}/${id}`,
        data,
        {withCredentials:true});
        return res.data;
    }

    catch(error){
        return error.response?.data;
    }
}


export const deleteTask=async(id)=>{

    try{
        const res=await axios.delete(`${TASK_API_END_POINT}/${id}`,
            {withCredentials:true});
        
        return res.data;
    }

    catch(error){
        return error.response?.data;
    }
    
}


export const createTask=async(data)=>{

    try{
        const res=await axios.post(`${TASK_API_END_POINT}`, 
        data,
        {withCredentials:true});
        
        return res.data;
    }

    catch(error){
        return error.response?.data;

    }
}


export const userBasedFetchTasks=async()=>{

    try{
        const res=await axios.get(`${TASK_API_END_POINT}`,
        {withCredentials:true});
            
        return res.data;
    }

    catch(error){
        return error.response?.data;
}
}



export const fetchTasks=async()=>{

    try{
        const res=await axios.get(`${TASK_API_END_POINT}`,
        {withCredentials:true});
            
        return res.data;
    }

    catch(error){
        return error.response?.data;
}
}
