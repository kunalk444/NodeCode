import { Router } from "express";
import problemModel from "../models/problemModel.js";

const problemRouter = Router();

problemRouter.get("/",async(req,res)=>{
    const problems = await problemModel.find({});
    if(problems)return res.json({success:true,problems});
    return res.json({success:false,msg:"problem in fetching,try again later!"});

})

export default problemRouter;