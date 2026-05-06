import Project from "../models/project.model.js";
import Task from "../models/task.model.js";


export const allTasks=async(req,res)=>{
    const {userId}=req;

    try{
        const tasks=await Task.find({assignedTo:userId});
        if(tasks.length===0) return res.status(200).json({
            success:false,
            message:"No task available yet."
        });

        return res.status(200).json({
            success:true,
            data:tasks
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Sever Error."
        })
    }
   
}

export const getTask=async(req,res)=>{
    const {task_id}=req.params;
    if(!task_id) return res.status(404).json({
        success:false,
        message:"Task id not found!"
    });

    try{
        
        const task=await Task.findById(task_id);
        if(!task) return res.status(404).json({
            success:false,
            message:"Task not found!"
        });

        return res.status(200).json({
            success:true,
            data:task
        });
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        })
    }

}

export const createTask=async(req,res)=>{
    const {taskName,description,status,projectId, assignedTo,dueDate}=req.body;
    try{
        const newTask=await Task.create({
            taskName,
            description,
            status,
            projectId,
            assignedTo,
            dueDate
        });

        
        await Project.findByIdAndUpdate(
            projectId,
            {$push: {tasks:newTask._id}},
            {new:true,runValidators:true}
        )

        return res.status(200).json({
            success:true,
            data:newTask,
            message:"Task Added Successfully!",
        });

    }
    catch(error){
        if(error.code===11000){
            return res.status(409).json({
                success:false,
                message:"Task already exists."
            })
        }

        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        })
    }
}

export const updateTask=async(req,res)=>{
    const {task_id}=req.params;
    const {title,description,status}=req.body;
    try{

        const updatedTask= await Task.findByIdAndUpdate(
            {_id:task_id},
            {title,description,status},
            {new:true,runValidators:true});

        if(!updatedTask){
            return res.status(404).json({
                success:false,
                message:"Task not found."
            })
        }
        return res.status(200).json({
            success:true,
            data:updatedTask,
            message:" Task Updation Successfull!"});

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        });
    }
   
}


export const updateSpecificTask=async(req,res)=>{

    const {task_id}=req.params;
    const {status}=req.body;
    try{

        const updatedTask= await Task.findByIdAndUpdate(
            {_id:task_id},
            {status},
            {new:true,runValidators:true});

        if(!updatedTask){
            return res.status(404).json({
                success:false,
                message:"Task not found."
            })
        }
        return res.status(200).json({
            success:true,
            data:updatedTask,
            message:" Task Updation Successfull!"});

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        });
    }
}

export const deleteTask=async(req,res)=>{
    const userId=req.userId;
    const {task_id}=req.params;
    try{
        const deletedTask= await Task.findByIdAndDelete(
            {_id:task_id},
            {new:true,runValidators:true});

            await Project.findByIdAndUpdate(deletedTask.projectId, {
            $pull: { tasks: deletedTask._id }
            });

        return res.status(200).json({
            success:true,
            data:deletedTask,
            message:"Task deleted Successfully!"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        });
    }
}

