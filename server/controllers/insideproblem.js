import problemModel from "../models/problemModel.js"

export const getProblemData = async(id)=>{
    const res = await problemModel.findById(id);
    if(!res)return null;
    return res;
}