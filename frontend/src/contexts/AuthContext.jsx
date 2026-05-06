import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const AuthContent=createContext();
export const useAuth=()=>{return useContext(AuthContent)};

export const AuthProvider=({children})=>{
    const [userName,setUserName]=useState(null);
    const [userId,setUserId]=useState(null);
    const [role,setRole]=useState(null);

    const [taskCount, setTaskCount] = useState({
    totalTask: 0,
    pendingTask: 0,
    completedTask: 0,
    overdueTask: 0,
    });
   
    useEffect(()=>{
        const currentUserName=localStorage.getItem("name");
        const curretnUserId=localStorage.getItem("userId")
        const role=localStorage.getItem("role");

        setUserName(currentUserName);
        setUserId(curretnUserId)
        setRole(role);
    },[])

    const value={userName,userId,setUserId,setUserName,role,setRole,taskCount,setTaskCount};
    return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>
}

