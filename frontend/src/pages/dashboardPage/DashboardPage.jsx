import TaskOverview from "../../components/TaskOverview";
import AllTaskAndProject from "../../components/AllTaskAndProject";
import Form from "../../components/Form";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function DashboardPage(){

   const [showForm, setShowForm]=useState(false);
   const [selectedData,setSelectedData]=useState(null);
   const [refreshKey, setRefreshKey] = useState(0); 
   const [mode,setMode]=useState("");
   const {role}=useAuth();

    const openProjectForm=(project)=>{
    setMode("project");
    setSelectedData(project);
    setShowForm(true);
   }

   const openTaskForm=(task)=>{
    setMode("task");
    setSelectedData(task);
    setShowForm(true);
   }


   const reRenderComponent = () => {
    setRefreshKey((prev) => prev + 1);
  };

    return (
        <>
        <TaskOverview 
        openTaskForm={openTaskForm} 
        openProjectForm={openProjectForm} />

        <AllTaskAndProject 
        openTaskForm={openTaskForm} 
        openProjectForm={openProjectForm} 
        refreshKey={refreshKey}
        />

        {showForm && (
        <Form
          mode={mode}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          setShowForm={setShowForm}
          reRenderComponent={reRenderComponent}
        />
        )}   
        </>
    )

}

export default DashboardPage;