import express from "express"
import { validate } from "../middlewares/validate.middleware.js";
import { signupValidation } from "../validations/user.validation.js";
import { allProject, createProject, deleteProject, updateProject } from "../controllers/project.controller.js";
import { createProjectValidation, updateProjectValidation } from "../validations/project.validation.js";
import { validUser } from "../middlewares/authUser.middleware.js";
const router=express.Router();

router
    .route("/")
    .get(validUser,allProject)
    .post(validUser,validate(createProjectValidation),createProject)

router
    .route("/:project_id")
    .put(validUser,validate(updateProjectValidation),updateProject)
    .delete(validUser,deleteProject)


export default router;