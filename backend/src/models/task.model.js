import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    taskName:
    {
        type:String,
        trim:true,
        required:true
    },
    description:
    {
        type:String,
        trim:true,
        required:true
    },
    status:
    {
        type:String,
        enum:["completed","in-progress","pending"],
        default:"pending"
    },

    assignedTo:
    {
       type:mongoose.Schema.Types.ObjectId,
       ref:"user",
       required:true
    },

    projectId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"project",
        trim:true,
        required:true
    },

    dueDate:
    {   type:Date,
        required:true
    }

},{timestamps:true})

const taskModel=mongoose.model("task",taskSchema);
export default taskModel;