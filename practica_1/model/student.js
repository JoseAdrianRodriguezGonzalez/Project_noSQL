import mongoose from "mongoose";

const studentSchema= new mongoose.Schema({
    name:{type:String,require:true,trim:true},
    birthDate:{type: Date,require:true},
    email:{type:String,require:true,unique:true,lowercase:true},
},{timestamps:true})
export const Student=mongoose.model("student",studentSchema);             