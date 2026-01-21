import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { verifyToken } from "./services/jwttoken.js";
import problemRouter from "./routes/problems.js";

const port = process.env.PORT;

const app = express();

const dbconnect=async()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/nodecode").
    then(()=>{
        console.log("connected to database!");
    })
}

dbconnect();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
    
}));



app.use("/auth",authRouter);
app.use("/viewproblems",problemRouter);

app.use((req,res,next)=>{
    const token = req.cookies.jwt;
    const verify = verifyToken(token);
    if(verify.success){
        req.user = verify.userObj;
        next();
    }
    return res.json({success:false,msg:"some error while authorization"})
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})



