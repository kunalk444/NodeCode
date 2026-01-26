import { Router } from "express";
import problemModel from "../models/problemModel.js";
import { getProblemData } from "../controllers/insideproblem.js";

const problemRouter = Router();

problemRouter.get("/",async(req,res)=>{
    const problems = await problemModel.find({},{
        _id:1,
        title:1,
        serial_no:1,
        difficulty:1,
    });
    if(problems)return res.json({success:true,problems});
    return res.json({success:false,msg:"problem in fetching,try again later!"});

});

problemRouter.get("/insideproblem",async(req,res)=>{
    const id = req.query.id;
    const ans = await getProblemData(id);
    if(ans)return res.status(200).json({success:true,data:ans});
    return res.status(404).json({success:false,msg:"Couldnt get Problem Data"});
});

export default problemRouter;