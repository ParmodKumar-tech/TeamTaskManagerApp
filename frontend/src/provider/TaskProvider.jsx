import { useState } from "react";
import { TaskContext } from "../contexts/index";

const TaskProvider=({children})=>{

    const [taskCount, setTaskCount] = useState({
    totalTask: 0,
    pendingTask: 0,
    completedTask: 0,
    overdueTask: 0,
    });


    return (
        <TaskContext.Provider 
        value={{taskCount, setTaskCount}}>
        {children}
        </TaskContext.Provider>
    )
}
export {TaskProvider}