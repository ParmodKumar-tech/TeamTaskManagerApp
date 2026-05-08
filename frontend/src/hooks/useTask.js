import { useContext } from "react"
import { TaskContext } from "../contexts/index"


const useTask =()=>{
    const {taskCount, setTaskCount ,open} =useContext(TaskContext);

    return {taskCount, setTaskCount};
}

export {useTask};