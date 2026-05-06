import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    projectName:
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

    members:
    [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }],

    tasks:
    [
        { 
        type:mongoose.Schema.Types.ObjectId,
        ref:"task",
        }
    ],

    dueDate:
    {   type:Date,
        required:true
    }

},{timestamps:true})

const projectModel=mongoose.model("project",projectSchema);
export default projectModel;