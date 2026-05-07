import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const AuthContent=createContext();
export const useAuth=()=>{return useContext(AuthContent)};

export const AuthProvider=({children})=>{
    const [userName,setUserName]=useState(null);
    const [userId,setUserId]=useState(null);
    const [role,setRole]=useState(null);

    const [showForm, setShowForm]=useState(false);
    const [selectedData,setSelectedData]=useState(null);
    const [mode,setMode]=useState("");
    const [refreshKey, setRefreshKey] = useState(0); 


    const [taskCount, setTaskCount] = useState({
    totalTask: 0,
    pendingTask: 0,
    completedTask: 0,
    overdueTask: 0,
    });
    
    const openProjectForm=(project)=>{
    console.log("openProjectForm")
    setMode("project");
    setSelectedData(project);
    setShowForm(true);
   
    }

    const openTaskForm=(task)=>{
    console.log("OpenTaskForm")
    setMode("task");
    setSelectedData(task);
    setShowForm(true);
   }


   const reRenderComponent = () => {
    setRefreshKey((prev) => prev + 1);
  };




    useEffect(()=>{
        const currentUserName=localStorage.getItem("name");
        const curretnUserId=localStorage.getItem("userId")
        const role=localStorage.getItem("role");

        setUserName(currentUserName);
        setUserId(curretnUserId)
        setRole(role);
    },[])

    const value=
    {
        userName,
        userId,
        setUserId,
        setUserName,
        role,
        setRole,
        taskCount,
        setTaskCount,
        openProjectForm,
        setShowForm,
        showForm,
        openTaskForm,
        mode,
        setMode,
        selectedData,
        setSelectedData,
        setRefreshKey,
        refreshKey,
        reRenderComponent,
    };
    return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>
}

