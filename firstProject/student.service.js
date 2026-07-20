import { Student } from "./student.model.js";
export const create=async(student)=>{
    return await Student.create(student);
}
export const get=async()=>{
    return await Student.find();
}