import { useContext } from "react"
import { FormContext } from "../contexts/index"

const useForm=()=>{
    const  {
        showForm, 
        openTaskForm,
        openProjectForm,
        setShowForm, 
        selectedData, 
        setSelectedData, 
        mode, 
        setMode
        } = useContext(FormContext)

    return {
        showForm, 
        openTaskForm,
        openProjectForm,
        setShowForm, 
        selectedData, 
        setSelectedData, 
        mode, 
        setMode
    }
}

export {useForm};