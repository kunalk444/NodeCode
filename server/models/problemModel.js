import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    serial_no:{
        type:String,
        unique:true,
        index:true,
    },
    description: String,
    title : String,
    testcases : Array,
    return_type : String,
    function_name : String,
    expected_output : Array,
    difficulty:{
        type : String,
        enum : ["easy","medium","hard"]
    },
    parameter_type : String,

});

const problemModel = mongoose.model("problems",problemSchema);

export default problemModel;