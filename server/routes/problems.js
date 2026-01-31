import { Router } from "express";
import problemModel from "../models/problemModel.js";
import { getProblemData } from "../controllers/insideproblem.js";
import userModel from "../models/userModel.js";
import { authMiddleware } from "../services/middleware.js";
import { verifyToken } from "../services/jwttoken.js";
import mongoose from "mongoose";

const problemRouter = Router();

problemRouter.get("/", async (req, res) => {
    try {
        const tag = req.query.tag;
        const status = req.query.status;
        const currentpage = req.query.currentpage;
        const limit = req.query.limit;
       
        const skip = (currentpage-1)*limit;
        const obj = {};

        if (tag && tag !== "all") obj.difficulty = tag;
        if (status && status !== "all") {

            const token = req.cookies.jwt;
            const verify = verifyToken(token);
            if (verify.success) {
                const userId = verify.userObj?.id;
                const solvedByUser = await userModel.findById(userId, {
                    solved: 1,
                    _id: 0,
                });

                if (status === "solvedbyme") {
                    obj._id = { $in: solvedByUser.solved }
                } else {
                    obj._id = { $nin: solvedByUser.solved }
                }
            }
        }

        const problems = await problemModel.find(obj, {
            _id: 1,
            title: 1,
            serial_no: 1,
            difficulty: 1,
        }).skip(skip).limit(limit);

        
        const total = await problemModel.countDocuments(obj);

        if (problems) return res.json({ success: true, problems , total });
        problemModel.fin
        return res.json({ success: false, msg: "problem in fetching,try again later!" });
    } catch (err) {
        return res.json({ success: false, msg: err });
    }

});

problemRouter.get("/insideproblem", async (req, res) => {
    try {
        const id = req.query.id;
        const ans = await getProblemData(id);
        const token = req.cookies.jwt;
        if(token){
            const yo = verifyToken(token);
            if(yo.success){
                const userid = yo.userObj.id;
                const data = await userModel.findById(userid).select("solved").lean();
                if(data){
                    const solved = data.solved;
                    const arr = solved.map((ele)=>String(ele));
                    if(ans && arr.includes(id))return res.status(200).json({ success: true, data: ans ,solved:true});
                }
            }
        }

        if (ans) return res.status(200).json({ success: true, data: ans , solved : false });
        return res.status(404).json({ success: false, msg: "Couldnt get Problem Data" });
    } catch (err) {
        return res.json({ success: false, msg: err });
    }
});

problemRouter.get("/search",async(req,res)=>{
    try {
        const str = req.query.s;
        const ans = await problemModel.find({
            title:{$regex:str,$options:"i"},
        },{
            _id:1,
            title:1,
        });
        if(!ans)return res.json({success:false});
        return res.json({success:true,data:ans});
    } catch (err) {
        return res.json({ success: false, msg: err });
    }
});

export default problemRouter;