import jwt from "jsonwebtoken";
import 'dotenv/config';

const secret=String(process.env.JWT_SECRET);


export const createJwtToken=(user)=>{
    try{
    const token=jwt.sign(user,secret);
    return token;
    }catch(err){
        console.log("error:",err)
    }
}
export const verifyToken=(token)=>{
    try{
    if(token===undefined)return {success:false};
    const userObj=jwt.verify(token,secret);
    if(userObj)return {success:true,userObj};
    return {success:false};
    }catch(err){
        console.log("error:",err)
        return null;
    }
}
