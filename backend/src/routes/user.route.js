import express from "express";
import {signup,login,logout} from "../controllers/user.controller.js"
import { loginValidation, signupValidation } from "../validations/user.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { validUser } from "../middlewares/authUser.middleware.js";
const router=express.Router();

router
    .route("/signup")
    .post(validate(signupValidation),signup)

router 
    .route("/login")
    .post(validate(loginValidation),login)

router
    .route("/logout")
    .get(logout)

export default router;