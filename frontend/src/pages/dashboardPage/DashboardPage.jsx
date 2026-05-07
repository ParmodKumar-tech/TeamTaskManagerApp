import TaskOverview from "../../components/TaskOverview";
import AllTaskAndProject from "../../components/AllTaskAndProject";
import Form from "../../components/Form";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function DashboardPage(){
   const 
   {
    showForm,
    role,
    openProjectForm,
    openTaskForm,
    selectedData,
    setSelectedData,
    setRefreshKey,
    refreshKey,
    mode,
    setMode
    }=useAuth();

    return (
        <div className='overflow-x-hidden'>
        <TaskOverview />
        <AllTaskAndProject/>
        {showForm && <Form/>}   
        </div>
    )

}

export default DashboardPage;
