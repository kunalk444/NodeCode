import userModel from "../models/userModel.js"
import { hashPassword, verifyPassword } from "../services/hashPassword.js";

export const createUser = async(payload) =>{

    const ifAlready = await userModel.findOne({email:payload.email});
    if(ifAlready)return {success:false,msg:"User Already Exists!"}

    const hash = await hashPassword(payload.password);
    const res = await userModel.create({
        name:payload.name,
        email:payload.email,
        password:hash
    });
    if(res)return {success:true,user:{id:res._id,name:res.name,email:res.email}};
    return {success:false,msg:"Retry Later!"};

}

export const handleGoogleLogin = async(email,name)=>{
    const user = await userModel.findOneAndUpdate(
        {email},
        {
            $setOnInsert:{
                name,
                registration_type:"google_login"
            }
        },
        {
            upsert:true,
            new:true,
        }
    );
    if(user)return {success:true,user:{name:user.name,email:user.email,id:user._id}};
    return {success:false,msg:"Try Again Later!"};
}

export const handleLogin = async(user) =>{
    const u1 = await userModel.findOne({email:user.email});
    if(!u1)return {success:false,msg:"User doesn't exist!"}
    if(u1.registration_type === "google_login")return {success:false,msg:"Sign in using google!"}
    const ifSame = await verifyPassword(user.password,(u1.password||undefined));
    if(ifSame)return {success:true,user:{name:u1.name,email:u1.email,id:u1._id}};
    return {success:false,msg:"Wrong Password!"};
}