import { useContext, useState } from "react"
import { FormContext } from "../contexts"



const FormProvider=({children})=>{

    const [showForm, setShowForm]=useState(false);
    const [selectedData,setSelectedData]=useState(null);
    const [mode,setMode]=useState("");
    
    
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


    return (
        <FormContext.Provider value={{
            showForm, 
            setShowForm, 
            selectedData, 
            setSelectedData, 
            openProjectForm,
            openTaskForm,
            mode, 
            setMode
            }}>{children}
        </FormContext.Provider>
    )
}


export {FormProvider}