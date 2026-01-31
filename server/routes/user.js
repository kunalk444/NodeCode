import { Router } from "express";
import { handleUserProgress } from "../controllers/user.js";
import userModel from "../models/userModel.js";
import problemModel from "../models/problemModel.js";

const userRouter = Router();

userRouter.post("/progress",async(req,res)=>{
    try{
        const {success,type,msg,problemId} = req.body;
        //console.log(success,type,msg,problemId);
        const user = req.user;
       // console.log(user)
        const ans = await handleUserProgress({success,type,msg,problemId,userId:user.id});
        return res.status(200).json({success:ans});
    }catch(err){
        return res.status(500).json({success:false,msg:"Internal Server Error"});
    }
});

userRouter.get("/showprogress",async(req,res)=>{
    try{
        const user = req.user;
        const ans = await userModel.findById(user.id).select("progress solved").lean();

        if(!ans || (ans && !ans?.progress))return res.json({success:false,msg:"Problem in fetching Data!"});

        const progress = ans.progress;
        const arr = ans?.solved.map((ele)=>String(ele));
        const report = {medium:0,hard:0,easy:0};

        await Promise.all(Object.keys(progress).map(async(id)=>{
            const yo = await problemModel.findById(id).select("title difficulty").lean();
            if(!yo){
                progress[`${id}`].title = "Couldnt load title";
            }
            else{
                progress[`${id}`].title = yo.title;
                if(arr.includes(String(id)))report[yo.difficulty]++;
            }
        }));

        return res.json({success:true,progress:ans.progress,report})
    }catch(err){
        return res.status(500).json({success:false,msg:"Internal Server Error"});
    }
})
export default userRouter;