import { Router } from "express";
import { handleUserProgress } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/progress",async(req,res)=>{
    const {success,type,msg,problemId} = req.body;
    console.log(success,type,msg,problemId);
    const user = req.user;
    console.log(user)
    const ans = await handleUserProgress({success,type,msg,problemId,userId:user.id});
    return res.status(200).json({success:ans});
});

export default userRouter;