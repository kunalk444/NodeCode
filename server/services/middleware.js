import { verifyToken } from "./jwttoken.js";

export const authMiddleware = (req,res,next)=>{
    const token = req.cookies.jwt;
    const verify = verifyToken(token);
    if(!verify.success)return res.status(401).json({success:false,msg:"some error while authorization!"});
    req.user = verify.userObj;
    next();
}