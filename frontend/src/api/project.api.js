
import axios from "axios";
const PROJECT_API_END_POINT=import.meta.env.VITE_PROJECT_API;

export const updateProject=async(id,data)=>{
    try{
        const res=await axios.put(`${PROJECT_API_END_POINT}/${id}`,
        data,
        {withCredentials:true});
        return res.data;
    }

    catch(error){
        return error.response?.data;
    }
}


export const deleteProject=async(id)=>{

    try{
        const res=await axios.delete(`${PROJECT_API_END_POINT}/${id}`,
            {withCredentials:true});
        
        return res.data;
    }

    catch(error){
        return error.response?.data;
    }
    
}


export const createProject=async(data)=>{

    try{
        const res=await axios.post(`${PROJECT_API_END_POINT}`, 
        data,
        {withCredentials:true});
        
        return res.data;
    }

    catch(error){
        return error.response?.data;

    }
}


export const fetchProjects=async()=>{

    try{
        const res=await axios.get(`${PROJECT_API_END_POINT}`,
        {withCredentials:true});
        return res.data;
    }

    catch(error){
        return error.response?.data;
}
}

