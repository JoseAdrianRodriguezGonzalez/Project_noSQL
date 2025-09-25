import { Student } from "./model/student.js";
export const create=async(student)=>{ //Create
    return await Student.create(student);
}
//Read
export const get=async()=>{
    return await Student.find();
}
//Update
export const update=async(filter,student)=>{
    return await Student.updateOne(filter,student);
}
//Delete
export const deletes=async(student)=>{
    return await Student.deleteOne(student)
}