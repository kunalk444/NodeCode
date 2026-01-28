import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
    },
    registration_type:{
        type:String,
        default:"normal"
    },
    progress:{
        type:Object,
    },
    solved:
    {
        type:[mongoose.Types.ObjectId],
        ref : "problems"
    }
});


const userModel = mongoose.model("user",userSchema);
export default userModel;