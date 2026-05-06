import Project from "../models/project.model.js";

export const allProject=async(req,res)=>{
    
    try{
        const projects=await Project.find({});
        
        if(projects.length===0) return res.status(200).json({
            success:false,
            message:"No project available yet."
        });

        return res.status(200).json({
            success:true,
            data:projects
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Sever Error."
        })
    }
   
}

export const getProject=async(req,res)=>{
    const {project_id}=req.params;
    if(!project_id) return res.status(404).json({
        success:false,
        message:"project id not found!"
    });

    try{
        
        const project=await Project.findById(project_id);
        if(!project) return res.status(404).json({
            success:false,
            message:"Project not found!"
        });

        return res.status(200).json({
            success:true,
            data:project
        });
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        })
    }

}

export const createProject=async(req,res)=>{
    const {projectName,description,memberId, dueDate}=req.body;
    try{
        const newProject=await Project.create({
            projectName,
            description,
            members: memberId,
            dueDate
        });

        return res.status(200).json({
            success:true,
            data:newProject,
            message:"Project Added Successfully!",
        });

    }
    catch(error){
        if(error.code===11000){
            return res.status(409).json({
                success:false,
                message:"Project already exists."
            })
        }

        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        })
    }
}

export const updateProject=async(req,res)=>{
    const {project_id}=req.params;
    const {projectName,description,memberId,dueDate}=req.body;
    try{

        const updatedProject= await Project.findByIdAndUpdate(
            {_id:project_id},
            {projectName,description,members:memberId,dueDate},
            {new:true,runValidators:true}
        );

        if(!updatedProject){
            return res.status(404).json({
                success:false,
                message:"Project not found."
            })
        }
        return res.status(200).json({
            success:true,
            data:updatedProject,
            message:" Project Updation Successfull!"});

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        });
    }
   
}

export const deleteProject=async(req,res)=>{
    const userId=req.userId;
    const {project_id}=req.params;
    try{
        const deletedProject= await Project.findByIdAndDelete(
            {_id:project_id},
            {new:true,runValidators:true});

        return res.status(200).json({
            success:true,
            data:deletedProject,
            message:"Project deleted Successfully!"
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        });
    }
}

