import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/index";

const AuthProvider =({children})=>{

    const [userName,setUserName]=useState(null);
    const [userId,setUserId]=useState(null);
    const [role,setRole]=useState(null);


    useEffect(()=>{
            const currentUserName=localStorage.getItem("name");
            const curretnUserId=localStorage.getItem("userId")
            const role=localStorage.getItem("role");
    
            setUserName(currentUserName);
            setUserId(curretnUserId)
            setRole(role);
    },[])


    return (
        <AuthContext.Provider value={{userName,setUserName,userId,setUserId,setRole,role}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider}