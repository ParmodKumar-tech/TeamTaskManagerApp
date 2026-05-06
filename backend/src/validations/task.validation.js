import Joi from "joi";

export const createTaskValidation=Joi.object({
    taskName:Joi.string().min(3).max(50).trim().required(),
    description:Joi.string().min(5).trim().required(),
    status:Joi.string().valid("completed","in-progress", "pending").optional(),
    projectId: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(), 
    
    assignedTo: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(), 

    dueDate: Joi.date().iso().required(),
})

export const updateTaskValidation=Joi.object({
    taskName:Joi.string().min(3).max(50).trim().required(),
    description:Joi.string().min(5).trim().required(),
    status:Joi.string().valid("completed","in-progress", "pending").optional(),
}).min(1);