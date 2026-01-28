import express from "express";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { verifyToken } from "./services/jwttoken.js";
import problemRouter from "./routes/problems.js";
import { authMiddleware } from "./services/middleware.js";
import problemModel from "./models/problemModel.js";
import userRouter from "./routes/user.js";

const port = process.env.PORT;

const app = express();

const dbconnect = async () => {
    mongoose.connect("mongodb://127.0.0.1:27017/nodecode").
        then(() => {
            console.log("connected to database!");
        })
}

dbconnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}));

app.use("/auth", authRouter);
app.use("/viewproblems", problemRouter);

app.use(authMiddleware);
app.use("/user",userRouter);


app.listen(port, () => {
    console.log(`server running on port ${port}`);
});


    
