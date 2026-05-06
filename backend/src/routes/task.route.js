import express from "express";
import { createTask, deleteTask, updateTask, allTasks,getTask, updateSpecificTask } from "../controllers/task.controller.js";
import { validUser } from "../middlewares/authUser.middleware.js";
import { createTaskValidation, updateTaskValidation } from "../validations/task.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router=express.Router();

router 
    .route("/")
    .get(validUser,allTasks)
    .post(validUser,validate(createTaskValidation),createTask)
    
router 
    .route("/:task_id")
    .get(validUser,getTask)
    .put(validUser,validate(updateTaskValidation),updateTask)
    .patch(validUser,updateSpecificTask)
    .delete(validUser,deleteTask)

export default router;    
