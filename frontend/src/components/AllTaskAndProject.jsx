import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import TaskCard from "./TaskCard";
import { deleteProject, fetchProjects } from "../api/project.api";
import { useState } from "react";
import toast from "react-hot-toast";
import { fetchTasks } from "../api/task.api";


function AllTaskAndProject({openTaskForm,openProjectForm,refreshKey }){

    const {role,setTaskCount} =useAuth();
    const [data,setData]=useState([]); 

    useEffect(() => {
        if (!role) return;

        if (role === "admin") {
            Projects();
        } else if (role === "member") {
            Tasks();
        }
    }, [role,refreshKey]);

    const Projects= async()=>{
        const toastId = toast.loading("please wait...");
        const res=await fetchProjects();
        
        if (res.success) {
            setData(res.data);
            
        } else {
            toast.error(res.message);
            setData([])
        }
        toast.dismiss(toastId);

    }

    const Tasks = async () => {
    const toastId = toast.loading("please wait...");
    const res = await fetchTasks();
    
    if (res.success) {
        const tasks = res.data;
        setData(tasks);
        
        const completed = tasks.filter(t => t.status === "completed").length;
        const pending = tasks.filter(t => t.status === "pending").length;
        const inProgress = tasks.filter(t => t.status === "in-progress").length;
        
        const overdue = tasks.filter(t => 
            t.status !== "completed" && 
            t.dueDate && new Date(t.dueDate) < new Date()
        ).length;

        setTaskCount({
            totalTask: tasks.length,
            pendingTask: pending + inProgress, 
            completedTask: completed,
            overdueTask: overdue
        });
        
    } else {
        toast.error(res.message);
        setData([]);
    }
    toast.dismiss(toastId);
    }


    const onDeleteRerender = async (deletedData) => {
    setData((prev) => prev.filter((t) => t._id !== deletedData._id));

    let res;
    if(deletedData.projectName){
        res = await deleteProject(deletedData._id);
    }else{
        res = await deleteTask(deletedData._id);
    }

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }


    return(
        <>
        <div className="px-4 mt-2" >
            <h1 className="font-bold text-2xl px-4 py-2 rounded-md inline-block mb-4">
                    { role ==="member"&&"All Task"}
            </h1>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-5">
        {data.map((task)=>(
            <TaskCard key={task._id} 
            task={task} 
            openTaskForm={openTaskForm} 
            openProjectForm={openProjectForm} 
            onDeleteRerender={onDeleteRerender}
            />
        ))}
        </div>
        </>
    )
}

export default AllTaskAndProject;