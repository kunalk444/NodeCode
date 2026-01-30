import { Router } from "express";
import { handleUserProgress } from "../controllers/user.js";
import userModel from "../models/userModel.js";
import problemModel from "../models/problemModel.js";

const userRouter = Router();

userRouter.post("/progress",async(req,res)=>{
    const {success,type,msg,problemId} = req.body;
    //console.log(success,type,msg,problemId);
    const user = req.user;
   // console.log(user)
    const ans = await handleUserProgress({success,type,msg,problemId,userId:user.id});
    return res.status(200).json({success:ans});
});

userRouter.get("/showprogress",async(req,res)=>{
    const user = req.user;
    const ans = await userModel.findById(user.id).select("progress").lean();
    if(!ans || (ans && !ans?.progress))return res.json({success:false,msg:"Problem in fetching Data!"});
    const progress = ans.progress;
    for(const id of Object.keys(progress)){
        const yo = await problemModel.findById(id).select("title").lean();
        if(!yo)progress[`${id}`].title = "Couldnt load title";
        else progress[`${id}`].title = yo.title;
    }

    return res.json({success:true,progress:ans.progress})
})
export default userRouter;