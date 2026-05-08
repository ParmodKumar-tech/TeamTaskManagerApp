import { Link } from "react-router-dom";
import TaskOverviewCard from "./TaskOverviewCard";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";


function TaskOverview(){
    
    const {role}=useAuth();
    const {openProjectForm,openTaskForm} =useForm();
    
    return (
        <>
        <div className=" bg-white px-5">
            <div className="flex flex-wrap items-center justify-between px-0 py-4 sm:px-0 ">
                <h1 className="font-bold text-3xl px-4 py-2 rounded-md inline-block mb-4">
                    {role === "admin"? "All Projects" : "Task Overview"}
                </h1>

                {role === "admin" &&
                <div>                
                <button onClick={()=>openProjectForm(null)}
                className="bg-blue-700 text-white p-2 mr-4 rounded shadow-2xl cursor-pointer">Add New Project
                </button>                
                <button onClick={()=>openTaskForm(null)}
                className="bg-blue-700 text-white p-2 mr-4 rounded shadow-2xl cursor-pointer">Add New Task
                </button>                
                </div>
                }   
            </div>
            {role === "member" && <TaskOverviewCard/>}
        </div>
        </>
    )
}

export default TaskOverview;