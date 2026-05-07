import express from "express";
import taskRouter from "./src/routes/task.route.js";
import userRouter from "./src/routes/user.route.js";
import projectRouter from "./src/routes/project.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/db.config.js";
import cors from "cors";

import "dotenv/config";


const app=express();
connectDB();
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));


app.use(express.json());
app.use("/api/v1/task",taskRouter);
app.use("/api/v1/project",projectRouter);
app.use("/api/v1/user",userRouter);


app.listen(process.env.PORT, (req,res)=>{
    console.log("server is listening...");
});
